"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Check, Filter, Mail } from "lucide-react";
import { SiteTabs } from "@/components/SiteTabs";
import { SplitFlapCounter } from "@/components/SplitFlapCounter";
import { advisoryText } from "@/data/advisory";
import { captureEvent } from "@/lib/analytics";
import { captureAdvisoryLead } from "@/lib/leadCapture";
import { isValidEmail } from "@/lib/reportKit";

type AdvisoryFormState = {
  name: string;
  email: string;
  role: string;
  leverageGoal: string;
};

function getReleasedCount() {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  const span = end.getTime() - start.getTime();
  const elapsed = Math.max(0, Math.min(span, now.getTime() - start.getTime()));
  const progress = span > 0 ? elapsed / span : 0;
  const { releasedMin, releasedMax, releasedCap } = advisoryText.counters;

  return Math.min(
    releasedCap,
    Math.round(releasedMin + (releasedMax - releasedMin) * progress)
  );
}

function getRandomIncrementDelay() {
  const { sessionIncrementMinMs, sessionIncrementMaxMs } = advisoryText.counters;
  const range = sessionIncrementMaxMs - sessionIncrementMinMs;

  return sessionIncrementMinMs + Math.round(Math.random() * range);
}

function useReleasedCounter() {
  const [value, setValue] = useState(advisoryText.counters.releasedMin);

  useEffect(() => {
    setValue(getReleasedCount());

    const syncInterval = window.setInterval(() => {
      setValue((currentValue) => Math.max(currentValue, getReleasedCount()));
    }, 60_000);

    return () => window.clearInterval(syncInterval);
  }, []);

  useEffect(() => {
    let timeout = 0;
    let cancelled = false;

    function tick() {
      timeout = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        setValue((currentValue) => {
          const baseline = getReleasedCount();
          const nextValue = Math.max(currentValue, baseline) + 1;

          return Math.min(advisoryText.counters.releasedCap, nextValue);
        });
        tick();
      }, getRandomIncrementDelay());
    }

    tick();

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  return value;
}

function CounterModule({
  releasedValue
}: {
  releasedValue: number;
}) {
  const counters = advisoryText.counters;

  return (
    <div className="rounded-lg border border-[var(--color-rule)] bg-mind-surface2 p-5 text-center shadow-mindMd sm:p-6">
      <SplitFlapCounter
        value={releasedValue}
        minDigits={3}
        label={counters.releasedLabel}
        sublabel={counters.releasedSublabel}
      />

      <div className="relative my-5 overflow-hidden rounded-lg border border-[var(--color-rule)] bg-mind-ink p-5 text-mind-bg sm:my-6 sm:p-6">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-mind-blob-light" aria-hidden="true" />

        <div className="flex items-center justify-center pb-5">
          <div className="h-12 w-px bg-[rgba(234,234,242,0.24)]" />
        </div>

        <div className="mx-auto flex max-w-xs flex-col items-center text-center">
          <div className="atlas-filter-mark relative flex h-32 w-32 items-center justify-center rounded-full border border-[rgba(234,234,242,0.24)] bg-[rgba(234,234,242,0.06)]">
            <span className="absolute h-24 w-24 rounded-full border border-mind-blob-light opacity-70" />
            <span className="absolute h-20 w-20 rounded-full border border-dashed border-[rgba(234,234,242,0.34)]" />
            <span className="relative font-display text-3xl uppercase tracking-[0.08em] text-mind-bg">
              Atlas
            </span>
          </div>
          <p className="mt-5 max-w-[18rem] text-sm font-light leading-6 text-[rgba(234,234,242,0.72)]">
            Reads the flood, rejects the generic, and keeps only the leverage signal.
          </p>
        </div>

        <div className="flex items-center justify-center py-5">
          <div className="h-12 w-px bg-[rgba(234,234,242,0.24)]" />
        </div>

        <SplitFlapCounter
          value={counters.relevant}
          label={counters.relevantLabel}
          sublabel={counters.relevantSublabel}
          size="small"
          quiet
        />
      </div>
    </div>
  );
}

export function AdvisoryExperience() {
  const releasedValue = useReleasedCounter();
  const [form, setForm] = useState<AdvisoryFormState>({
    name: "",
    email: "",
    role: "",
    leverageGoal: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const leveragePoints = useMemo(() => advisoryText.leveragePoints, []);

  function updateForm(field: keyof AdvisoryFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
    setSuccess(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess(false);

    const email = form.email.trim();

    captureEvent("advisory_cta_clicked", {
      has_email: Boolean(email)
    });

    if (!email || !isValidEmail(email)) {
      setError(advisoryText.form.invalidEmail);
      return;
    }

    setSubmitting(true);

    try {
      const result = await captureAdvisoryLead({
        email,
        name: form.name.trim(),
        role: form.role.trim(),
        leverageGoal: form.leverageGoal.trim(),
        pageUrl: window.location.href,
        userAgent: window.navigator.userAgent
      });

      if (!result.ok) {
        setError(
          result.reason === "missing_config"
            ? advisoryText.form.missingConfig
            : advisoryText.form.failed
        );
        return;
      }

      captureEvent("advisory_lead_submitted", {
        has_name: Boolean(form.name.trim()),
        has_role: Boolean(form.role.trim()),
        has_leverage_goal: Boolean(form.leverageGoal.trim())
      });
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        role: "",
        leverageGoal: ""
      });
    } catch {
      setError(advisoryText.form.failed);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main id="top" className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-50 border-b border-[var(--color-rule)] bg-[rgba(234,234,242,0.9)] px-4 py-2.5 backdrop-blur-md sm:px-10">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <a
            href="#top"
            className="font-display text-2xl uppercase tracking-[0.05em] text-mind-ink"
            aria-label="AI Atlas"
          >
            AI ATLAS<span className="text-mind-blob">.</span>
          </a>
          <SiteTabs active="advisory" className="order-3 w-full justify-center sm:order-none sm:w-auto" />
        </nav>
      </header>

      <section className="relative px-4 pb-14 pt-8 sm:px-10 lg:pb-20 lg:pt-14">
        <div className="atlas-map-plane pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div className="animate-reveal pt-4 lg:pt-10">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[var(--color-rule)] bg-mind-surface2 px-4 py-2 shadow-mindSm">
              <Filter size={15} className="text-mind-blob-deep" />
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-mind-muted">
                {advisoryText.hero.eyebrow}
              </span>
            </div>

            <h1 className="max-w-3xl font-display text-[clamp(54px,9vw,104px)] uppercase leading-[0.88] text-mind-ink">
              {advisoryText.hero.headline}
            </h1>
            <p className="mt-5 max-w-xl text-base font-light leading-7 text-mind-muted">
              {advisoryText.hero.subheadline}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#brief"
                onClick={() =>
                  captureEvent("advisory_cta_clicked", {
                    source: "hero"
                  })
                }
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-mind-ink px-6 pb-1.5 pt-2 font-display text-lg uppercase tracking-[0.04em] text-mind-bg transition hover:scale-[1.03] hover:shadow-mindMd"
              >
                <Mail size={17} />
                {advisoryText.hero.primaryCta}
              </a>
              <a
                href="/map/"
                onClick={() =>
                  captureEvent("tab_switched", {
                    tab: "map",
                    source: "hero_secondary"
                  })
                }
                className="inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-mind-ink px-6 pb-1.5 pt-2 font-display text-lg uppercase tracking-[0.04em] text-mind-ink transition hover:scale-[1.03] hover:bg-mind-ink hover:text-mind-bg"
              >
                {advisoryText.hero.secondaryCta}
                <ArrowRight size={17} />
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:max-w-2xl">
              {leveragePoints.map((point) => (
                <div key={point.label} className="rounded-lg border border-[var(--color-rule)] bg-mind-surface2 p-4 shadow-mindSm">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-mind-blob-pale text-mind-blob-deep">
                      <Check size={13} />
                    </span>
                    <h2 className="font-display text-2xl uppercase leading-none text-mind-ink">
                      {point.label}
                    </h2>
                  </div>
                  <p className="mt-3 text-sm font-light leading-6 text-mind-muted">{point.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:min-h-[650px]">
            <div className="grid gap-4 lg:absolute lg:right-0 lg:top-0 lg:w-[min(100%,34rem)]">
              <CounterModule releasedValue={releasedValue} />
            </div>
          </div>
        </div>
      </section>

      <section id="brief" className="scroll-mt-24 border-t border-[var(--color-rule)] px-4 py-12 sm:px-10 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-start">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-mind-blob-deep">
              {advisoryText.form.eyebrow}
            </p>
            <h2 className="mt-2 max-w-xl font-display text-[clamp(40px,6vw,68px)] uppercase leading-[0.92] text-mind-ink">
              {advisoryText.form.title}
            </h2>
            <p className="mt-4 max-w-lg text-sm font-light leading-6 text-mind-muted">
              {advisoryText.form.body}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg bg-mind-surface2 p-5 shadow-mindMd sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-mind-muted">
                  {advisoryText.form.nameLabel}
                </span>
                <input
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  disabled={submitting}
                  placeholder={advisoryText.form.namePlaceholder}
                  className="mt-2 min-h-12 w-full rounded-lg border border-[var(--color-rule)] bg-mind-surface px-4 text-sm font-light text-mind-ink outline-none placeholder:text-mind-muted focus:border-mind-blob"
                />
              </label>

              <label className="block">
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-mind-muted">
                  {advisoryText.form.emailLabel}
                </span>
                <input
                  value={form.email}
                  onChange={(event) => updateForm("email", event.target.value)}
                  type="email"
                  inputMode="email"
                  disabled={submitting}
                  placeholder={advisoryText.form.emailPlaceholder}
                  className="mt-2 min-h-12 w-full rounded-lg border border-[var(--color-rule)] bg-mind-surface px-4 text-sm font-light text-mind-ink outline-none placeholder:text-mind-muted focus:border-mind-blob"
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-mind-muted">
                {advisoryText.form.roleLabel}
              </span>
              <input
                value={form.role}
                onChange={(event) => updateForm("role", event.target.value)}
                disabled={submitting}
                placeholder={advisoryText.form.rolePlaceholder}
                className="mt-2 min-h-12 w-full rounded-lg border border-[var(--color-rule)] bg-mind-surface px-4 text-sm font-light text-mind-ink outline-none placeholder:text-mind-muted focus:border-mind-blob"
              />
            </label>

            <label className="mt-4 block">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-mind-muted">
                {advisoryText.form.goalLabel}
              </span>
              <textarea
                value={form.leverageGoal}
                onChange={(event) => updateForm("leverageGoal", event.target.value)}
                disabled={submitting}
                placeholder={advisoryText.form.goalPlaceholder}
                rows={4}
                className="mt-2 w-full resize-none rounded-lg border border-[var(--color-rule)] bg-mind-surface px-4 py-3 text-sm font-light leading-6 text-mind-ink outline-none placeholder:text-mind-muted focus:border-mind-blob"
              />
            </label>

            {error ? (
              <p className="mt-4 text-sm font-light leading-6 text-mind-blob-deep">{error}</p>
            ) : success ? (
              <p className="mt-4 text-sm font-light leading-6 text-mind-blob-deep">
                {advisoryText.form.success}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-mind-ink px-6 pb-2 pt-2.5 font-display text-xl uppercase tracking-[0.04em] text-mind-bg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Mail size={18} />
              {submitting ? advisoryText.form.submitting : advisoryText.form.button}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
