import type { Locale } from "@/types/content";

const FORMSPREE_ENDPOINT_BASE = "https://formspree.io/f";
const FORMSPREE_MAP_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_MAP_FORM_ID ?? "xvzyrrwb";
const FORMSPREE_ADVISORY_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_ADVISORY_FORM_ID ?? "mjgzrraz";

type ReportLeadInput = {
  email: string;
  industryId: string;
  industryName: string;
  locale: Locale;
  reportFilename: string;
  pageUrl?: string;
  userAgent?: string;
};

type CaptureReportLeadResult =
  | { ok: true }
  | { ok: false; reason: "missing_config" | "insert_failed"; message?: string };

type AdvisoryLeadInput = {
  email: string;
  name?: string;
  role?: string;
  leverageGoal?: string;
  pageUrl?: string;
  userAgent?: string;
};

type CaptureAdvisoryLeadResult =
  | { ok: true }
  | { ok: false; reason: "missing_config" | "insert_failed"; message?: string };

type CaptureLeadResult = CaptureReportLeadResult | CaptureAdvisoryLeadResult;
type FormspreePayload = Record<string, string | null | undefined>;

async function submitToFormspree(formId: string | undefined, payload: FormspreePayload): Promise<CaptureLeadResult> {
  if (!formId) {
    return { ok: false, reason: "missing_config" };
  }

  try {
    const formData = buildFormspreeFormData(payload);
    const response = await fetch(`${FORMSPREE_ENDPOINT_BASE}/${encodeURIComponent(formId)}`, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    });

    if (!response.ok) {
      return { ok: false, reason: "insert_failed", message: await readFormspreeError(response) };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      reason: "insert_failed",
      message: error instanceof Error ? error.message : undefined
    };
  }
}

function buildFormspreeFormData(payload: FormspreePayload) {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  return formData;
}

async function readFormspreeError(response: Response) {
  try {
    const body = (await response.json()) as { errors?: Array<{ message?: string }>; error?: string };
    const firstError = body.errors?.find((item) => item.message)?.message;

    return firstError ?? body.error ?? response.statusText;
  } catch {
    return response.statusText;
  }
}

export async function captureReportLead(input: ReportLeadInput): Promise<CaptureReportLeadResult> {
  return submitToFormspree(FORMSPREE_MAP_FORM_ID, {
    email: input.email,
    message: `AI Map report requested for ${input.industryName}.`,
    industry_id: input.industryId,
    industry_name: input.industryName,
    locale: input.locale,
    report_filename: input.reportFilename,
    page_url: input.pageUrl,
    user_agent: input.userAgent
  });
}

export async function captureAdvisoryLead(input: AdvisoryLeadInput): Promise<CaptureAdvisoryLeadResult> {
  return submitToFormspree(FORMSPREE_ADVISORY_FORM_ID, {
    email: input.email,
    name: input.name,
    role: input.role,
    message: input.leverageGoal,
    page_url: input.pageUrl,
    user_agent: input.userAgent
  });
}
