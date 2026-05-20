import type { Locale } from "@/types/content";

type SendReportEmailInput = {
  to: string;
  subject: string;
  text: string;
  filename: string;
  pdfBytes: Uint8Array;
  industryId: string;
  locale: Locale;
};

type SendReportEmailResult =
  | { ok: true; id?: string }
  | { ok: false; reason: "missing-endpoint" | "failed"; message?: string };

const reportEmailEndpoint = process.env.NEXT_PUBLIC_REPORT_EMAIL_ENDPOINT?.trim() ?? "";

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    let chunkBinary = "";

    for (let chunkIndex = 0; chunkIndex < chunk.length; chunkIndex += 1) {
      chunkBinary += String.fromCharCode(chunk[chunkIndex]);
    }

    binary += chunkBinary;
  }

  return window.btoa(binary);
}

export function hasReportEmailEndpoint() {
  return reportEmailEndpoint.length > 0;
}

export async function sendReportEmail({
  to,
  subject,
  text,
  filename,
  pdfBytes,
  industryId,
  locale
}: SendReportEmailInput): Promise<SendReportEmailResult> {
  if (!reportEmailEndpoint) {
    return { ok: false, reason: "missing-endpoint" };
  }

  const response = await fetch(reportEmailEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      to,
      subject,
      text,
      filename,
      attachmentBase64: bytesToBase64(pdfBytes),
      industryId,
      locale
    })
  });

  const payload = (await response.json().catch(() => null)) as { id?: string; error?: string } | null;

  if (!response.ok) {
    return {
      ok: false,
      reason: "failed",
      message: payload?.error ?? "Email delivery failed."
    };
  }

  return { ok: true, id: payload?.id };
}
