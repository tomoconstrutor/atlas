import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
  type RGB
} from "pdf-lib";
import type { ReportKit } from "@/lib/reportKit";

const PAGE_WIDTH = 595.2756;
const PAGE_HEIGHT = 841.8898;
const MARGIN = 42;

const palette = {
  bg: rgb(0.918, 0.918, 0.949),
  surface: rgb(1, 1, 1),
  ink: rgb(0.051, 0.051, 0.059),
  muted: rgb(0.353, 0.353, 0.4),
  pale: rgb(0.91, 0.895, 1),
  blob: rgb(0.659, 0.612, 0.878),
  deep: rgb(0.353, 0.314, 0.627)
};

type FontSet = {
  regular: PDFFont;
  bold: PDFFont;
  light: PDFFont;
};

function sanitize(input: string) {
  return input
    .replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function drawText(
  page: PDFPage,
  value: string,
  x: number,
  y: number,
  size: number,
  font: PDFFont,
  color: RGB = palette.ink
) {
  page.drawText(sanitize(value), { x, y, size, font, color });
}

function wrapText(value: string, font: PDFFont, size: number, maxWidth: number, maxLines = 99) {
  const words = sanitize(value).split(" ").filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= maxWidth) {
      current = next;
      continue;
    }

    if (current) {
      lines.push(current);
    }
    current = word;

    if (lines.length >= maxLines) {
      break;
    }
  }

  if (current && lines.length < maxLines) {
    lines.push(current);
  }

  if (lines.length === maxLines && words.length) {
    const last = lines[lines.length - 1];
    lines[lines.length - 1] = last.length > 3 ? `${last.slice(0, Math.max(0, last.length - 3))}...` : last;
  }

  return lines;
}

function drawWrapped(
  page: PDFPage,
  value: string,
  x: number,
  y: number,
  maxWidth: number,
  size: number,
  lineHeight: number,
  font: PDFFont,
  color: RGB = palette.muted,
  maxLines = 99
) {
  const lines = wrapText(value, font, size, maxWidth, maxLines);
  lines.forEach((line, index) => {
    page.drawText(line, {
      x,
      y: y - index * lineHeight,
      size,
      font,
      color
    });
  });
  return y - lines.length * lineHeight;
}

function addPage(pdfDoc: PDFDocument) {
  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: palette.bg });
  return page;
}

function drawHeader(page: PDFPage, fonts: FontSet, label: string, pageNumber: string) {
  drawText(page, "MIND.", MARGIN, PAGE_HEIGHT - 42, 10, fonts.bold, palette.ink);
  drawText(page, label.toUpperCase(), MARGIN, PAGE_HEIGHT - 66, 8, fonts.regular, palette.muted);
  drawText(page, pageNumber, PAGE_WIDTH - MARGIN - 34, PAGE_HEIGHT - 42, 8, fonts.regular, palette.muted);
  page.drawLine({
    start: { x: MARGIN, y: PAGE_HEIGHT - 80 },
    end: { x: PAGE_WIDTH - MARGIN, y: PAGE_HEIGHT - 80 },
    thickness: 0.6,
    color: palette.blob
  });
}

function drawFooter(page: PDFPage, fonts: FontSet, report: ReportKit, pageNumber: string) {
  page.drawLine({
    start: { x: MARGIN, y: 44 },
    end: { x: PAGE_WIDTH - MARGIN, y: 44 },
    thickness: 0.4,
    color: palette.blob
  });
  drawText(page, report.labels.footer.toUpperCase(), MARGIN, 26, 7.5, fonts.regular, palette.muted);
  drawText(page, pageNumber, PAGE_WIDTH - MARGIN - 32, 26, 7.5, fonts.regular, palette.muted);
}

function drawCover(pdfDoc: PDFDocument, fonts: FontSet, report: ReportKit) {
  const page = addPage(pdfDoc);

  for (let index = 0; index < 6; index += 1) {
    drawText(page, "MIND", 38, 735 - index * 58, 56, fonts.bold, index % 2 ? palette.blob : palette.ink);
  }
  drawText(page, "OUT", 360, 677, 78, fonts.bold, palette.blob);
  drawText(page, "OUT", 362, 612, 78, fonts.bold, palette.blob);

  page.drawRectangle({ x: 42, y: 96, width: PAGE_WIDTH - 84, height: 278, color: palette.surface });
  drawText(page, report.labels.coverKicker.toUpperCase(), 72, 330, 9, fonts.regular, palette.deep);
  drawWrapped(page, report.title, 72, 292, 395, 34, 35, fonts.bold, palette.ink, 3);
  drawWrapped(page, report.subtitle, 72, 176, 380, 12, 17, fonts.light, palette.muted, 3);

  drawText(page, report.labels.preparedBy.toUpperCase(), 72, 114, 7.5, fonts.regular, palette.deep);
  drawText(page, report.brand, 72, 96, 10, fonts.bold, palette.ink);
  drawText(page, report.labels.version.toUpperCase(), 350, 114, 7.5, fonts.regular, palette.deep);
  drawText(page, "1.0", 350, 96, 10, fonts.bold, palette.ink);
}

function drawContents(pdfDoc: PDFDocument, fonts: FontSet, report: ReportKit) {
  const page = addPage(pdfDoc);
  drawHeader(page, fonts, report.generatedLabel, "02 / 05");
  drawText(page, report.labels.contents.toUpperCase(), MARGIN, 690, 36, fonts.bold, palette.ink);

  const rows = [
    ["01", report.labels.opportunityFrame, "03"],
    ["02", report.labels.timeLeaks, "04"],
    ["03", report.labels.workflows, "04"],
    ["04", report.labels.miniTools, "04"],
    ["05", report.labels.prompts, "04"],
    ["06", report.labels.outreach, "05"]
  ];

  rows.forEach((row, index) => {
    const y = 610 - index * 62;
    drawText(page, row[0], MARGIN, y, 22, fonts.bold, palette.blob);
    drawText(page, row[1], MARGIN + 72, y + 5, 13, fonts.regular, palette.ink);
    drawText(page, row[2], PAGE_WIDTH - MARGIN - 20, y + 5, 11, fonts.regular, palette.muted);
    page.drawLine({
      start: { x: MARGIN + 72, y: y - 15 },
      end: { x: PAGE_WIDTH - MARGIN, y: y - 15 },
      thickness: 0.35,
      color: palette.blob
    });
  });

  drawWrapped(page, report.intro, MARGIN, 142, PAGE_WIDTH - MARGIN * 2, 11, 16, fonts.light, palette.muted, 4);
  drawFooter(page, fonts, report, "02 / 05");
}

function drawSectionIntro(pdfDoc: PDFDocument, fonts: FontSet, report: ReportKit) {
  const page = addPage(pdfDoc);
  drawHeader(page, fonts, report.labels.opportunityFrame, "03 / 05");
  drawText(page, "01", MARGIN, 640, 82, fonts.bold, palette.blob);
  drawText(page, report.labels.section01.toUpperCase(), MARGIN, 578, 9, fonts.regular, palette.deep);
  drawWrapped(page, report.industryName, MARGIN, 528, 420, 44, 45, fonts.bold, palette.ink, 2);
  drawWrapped(page, report.intro, MARGIN, 396, 390, 13, 18, fonts.light, palette.muted, 5);

  page.drawRectangle({ x: MARGIN, y: 158, width: PAGE_WIDTH - MARGIN * 2, height: 102, color: palette.pale });
  drawText(page, report.labels.firstWorkflow.toUpperCase(), MARGIN + 20, 228, 8, fonts.regular, palette.deep);
  drawWrapped(page, report.firstWorkflow.title, MARGIN + 20, 203, 220, 20, 22, fonts.bold, palette.ink, 2);
  drawWrapped(page, report.firstWorkflow.why, MARGIN + 270, 216, 205, 9.5, 13, fonts.light, palette.muted, 4);
  drawFooter(page, fonts, report, "03 / 05");
}

function drawFindings(pdfDoc: PDFDocument, fonts: FontSet, report: ReportKit) {
  const page = addPage(pdfDoc);
  drawHeader(page, fonts, report.labels.timeLeaks, "04 / 05");
  drawText(page, report.labels.timeLeaks.toUpperCase(), MARGIN, 694, 24, fonts.bold, palette.ink);

  report.problems.slice(0, 5).forEach((problem, index) => {
    const y = 650 - index * 43;
    drawText(page, String(index + 1).padStart(2, "0"), MARGIN, y, 13, fonts.bold, palette.blob);
    drawWrapped(page, problem, MARGIN + 42, y + 2, 220, 9, 12, fonts.light, palette.muted, 2);
  });

  drawText(page, report.labels.workflows.toUpperCase(), 330, 694, 24, fonts.bold, palette.ink);
  report.workflows.slice(0, 4).forEach((workflow, index) => {
    const y = 650 - index * 70;
    drawText(page, workflow.title, 330, y, 11, fonts.bold, palette.ink);
    drawWrapped(page, workflow.summary, 330, y - 16, 190, 8, 10, fonts.light, palette.muted, 2);
    drawWrapped(page, workflow.implementation, 330, y - 39, 190, 7.5, 9, fonts.regular, palette.deep, 2);
  });

  page.drawRectangle({ x: MARGIN, y: 128, width: PAGE_WIDTH - MARGIN * 2, height: 120, color: palette.surface });
  drawText(page, report.labels.miniTools.toUpperCase(), MARGIN + 18, 218, 10, fonts.regular, palette.deep);
  report.miniTools.slice(0, 3).forEach((tool, index) => {
    const x = MARGIN + 18 + index * 162;
    drawText(page, tool.title, x, 190, 10, fonts.bold, palette.ink);
    drawWrapped(page, tool.description, x, 172, 132, 7.5, 9.5, fonts.light, palette.muted, 3);
    drawWrapped(page, `Output: ${tool.output}`, x, 136, 132, 7, 8.5, fonts.regular, palette.deep, 2);
  });

  drawFooter(page, fonts, report, "04 / 05");
}

function drawClose(pdfDoc: PDFDocument, fonts: FontSet, report: ReportKit) {
  const page = addPage(pdfDoc);
  for (let index = 0; index < 6; index += 1) {
    drawText(page, "MIND", 42, 730 - index * 58, 54, fonts.bold, index % 2 ? palette.blob : palette.ink);
  }

  page.drawRectangle({ x: 324, y: 118, width: 205, height: 520, color: palette.surface });
  drawText(page, report.labels.outreach.toUpperCase(), 350, 590, 9, fonts.regular, palette.deep);
  drawWrapped(page, report.outreachVariants[0]?.body ?? "", 350, 548, 150, 9.5, 13, fonts.light, palette.muted, 12);
  drawText(page, report.labels.followUp.toUpperCase(), 350, 318, 8, fonts.regular, palette.deep);
  drawWrapped(page, report.followUp, 350, 292, 150, 8.5, 12, fonts.light, palette.muted, 8);

  drawText(page, "MIND.", 42, 96, 16, fonts.bold, palette.ink);
  drawText(page, report.labels.footer.toUpperCase(), 42, 72, 8, fonts.regular, palette.muted);
  drawText(page, "05 / 05", PAGE_WIDTH - MARGIN - 34, 72, 8, fonts.regular, palette.muted);
}

export async function generateReportPdf(report: ReportKit) {
  const pdfDoc = await PDFDocument.create();
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const light = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fonts = { regular, bold, light };

  drawCover(pdfDoc, fonts, report);
  drawContents(pdfDoc, fonts, report);
  drawSectionIntro(pdfDoc, fonts, report);
  drawFindings(pdfDoc, fonts, report);
  drawClose(pdfDoc, fonts, report);

  return pdfDoc.save();
}
