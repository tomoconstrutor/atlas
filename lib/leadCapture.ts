import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Locale } from "@/types/content";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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

let supabaseClient: SupabaseClient | null = null;

function getSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return null;
  }

  supabaseClient ??= createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false
    }
  });

  return supabaseClient;
}

export async function captureReportLead(input: ReportLeadInput): Promise<CaptureReportLeadResult> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { ok: false, reason: "missing_config" };
  }

  const { error } = await supabase.from("report_leads").insert({
    email: input.email,
    industry_id: input.industryId,
    industry_name: input.industryName,
    locale: input.locale,
    report_filename: input.reportFilename,
    page_url: input.pageUrl ?? null,
    user_agent: input.userAgent ?? null
  });

  if (error) {
    return { ok: false, reason: "insert_failed", message: error.message };
  }

  return { ok: true };
}

export async function captureAdvisoryLead(input: AdvisoryLeadInput): Promise<CaptureAdvisoryLeadResult> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { ok: false, reason: "missing_config" };
  }

  const { error } = await supabase.from("advisory_leads").insert({
    email: input.email,
    name: input.name || null,
    role: input.role || null,
    leverage_goal: input.leverageGoal || null,
    page_url: input.pageUrl ?? null,
    user_agent: input.userAgent ?? null
  });

  if (error) {
    return { ok: false, reason: "insert_failed", message: error.message };
  }

  return { ok: true };
}
