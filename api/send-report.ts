import type { IncomingMessage, ServerResponse } from "node:http";

type RequestPayload = {
  to?: string;
  subject?: string;
  text?: string;
  filename?: string;
  attachmentBase64?: string;
  industryId?: string;
  locale?: string;
};

const RESEND_EMAILS_ENDPOINT = "https://api.resend.com/emails";
const MAX_BASE64_ATTACHMENT_LENGTH = 12_000_000;
const DEFAULT_ALLOWED_ORIGINS = [
  "https://atlas-ai.pt",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://127.0.0.1:3002"
];

function getEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

function getAllowedOrigins() {
  const configured = getEnv("REPORT_EMAIL_ALLOWED_ORIGINS");
  return configured ? configured.split(",").map((origin) => origin.trim()).filter(Boolean) : DEFAULT_ALLOWED_ORIGINS;
}

function isAllowedOrigin(origin: string | undefined) {
  if (!origin) {
    return true;
  }

  return getAllowedOrigins().includes(origin);
}

function setCors(req: IncomingMessage, res: ServerResponse) {
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : undefined;

  if (origin && isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(res: ServerResponse, statusCode: number, payload: Record<string, unknown>) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function readBody(req: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    let body = "";

    req.on("data", (chunk: Buffer) => {
      body += chunk.toString("utf8");

      if (body.length > MAX_BASE64_ATTACHMENT_LENGTH + 20_000) {
        req.destroy();
        reject(new Error("Request body is too large."));
      }
    });

    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidFilename(value: string) {
  return /^ai-atlas-[a-z0-9-]+-(en|pt)-report\.pdf$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildHtml(text: string) {
  return `
    <div style="background:#eaeaf2;padding:28px;font-family:Arial,Helvetica,sans-serif;color:#0d0d0f;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;padding:28px;border-radius:18px;">
        <p style="margin:0 0 18px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#5a50a0;">AI Atlas</p>
        <h1 style="margin:0 0 18px;font-size:32px;line-height:1;text-transform:uppercase;">Your report is attached</h1>
        <pre style="white-space:pre-wrap;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.55;color:#5a5a66;">${escapeHtml(text)}</pre>
      </div>
    </div>
  `;
}

function normalizePayload(payload: RequestPayload) {
  const to = payload.to?.trim() ?? "";
  const subject = payload.subject?.trim() ?? "";
  const text = payload.text?.trim() ?? "";
  const filename = payload.filename?.trim() ?? "";
  const attachmentBase64 = payload.attachmentBase64?.trim() ?? "";
  const industryId = payload.industryId?.trim() ?? "unknown";
  const locale = payload.locale === "pt" ? "pt" : "en";

  if (!isValidEmail(to)) {
    throw new Error("Recipient email is invalid.");
  }

  if (subject.length < 3 || subject.length > 180) {
    throw new Error("Email subject is invalid.");
  }

  if (text.length < 20 || text.length > 12000) {
    throw new Error("Email body is invalid.");
  }

  if (!isValidFilename(filename)) {
    throw new Error("Attachment filename is invalid.");
  }

  if (!attachmentBase64 || attachmentBase64.length > MAX_BASE64_ATTACHMENT_LENGTH) {
    throw new Error("Attachment is missing or too large.");
  }

  return {
    to,
    subject,
    text,
    filename,
    attachmentBase64,
    industryId: industryId.replace(/[^a-z0-9-]/gi, "-").slice(0, 64),
    locale
  };
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed." });
    return;
  }

  const origin = typeof req.headers.origin === "string" ? req.headers.origin : undefined;
  if (!isAllowedOrigin(origin)) {
    sendJson(res, 403, { error: "Origin not allowed." });
    return;
  }

  const apiKey = getEnv("RESEND_API_KEY");
  const from = getEnv("RESEND_FROM_EMAIL");

  if (!apiKey || !from) {
    sendJson(res, 500, { error: "Email service is not configured." });
    return;
  }

  try {
    const body = await readBody(req);
    const payload = normalizePayload(JSON.parse(body) as RequestPayload);

    const resendResponse = await fetch(RESEND_EMAILS_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [payload.to],
        subject: payload.subject,
        text: payload.text,
        html: buildHtml(payload.text),
        attachments: [
          {
            filename: payload.filename,
            content: payload.attachmentBase64
          }
        ],
        tags: [
          { name: "source", value: "ai-atlas" },
          { name: "industry", value: payload.industryId },
          { name: "locale", value: payload.locale }
        ]
      })
    });

    const result = (await resendResponse.json().catch(() => null)) as { id?: string; message?: string } | null;

    if (!resendResponse.ok) {
      sendJson(res, resendResponse.status, {
        error: result?.message ?? "Resend email delivery failed."
      });
      return;
    }

    sendJson(res, 200, { id: result?.id });
  } catch (error) {
    sendJson(res, 400, {
      error: error instanceof Error ? error.message : "Invalid request."
    });
  }
}
