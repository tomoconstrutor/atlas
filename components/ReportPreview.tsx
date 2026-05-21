import type { ReactNode } from "react";
import type { ReportKit } from "@/lib/reportKit";

type ReportPreviewProps = {
  report: ReportKit;
};

function SmallLine({ children }: { children: string }) {
  return (
    <p className="text-[9px] font-light leading-[1.45] text-mind-muted">
      {children}
    </p>
  );
}

function PageShell({
  children,
  label,
  page
}: {
  children: ReactNode;
  label: string;
  page: string;
}) {
  return (
    <article className="aspect-[595/842] min-h-[260px] overflow-hidden rounded-2xl border border-[var(--color-rule)] bg-mind-bg p-4 shadow-mindSm">
      <div className="flex items-start justify-between border-b border-mind-blob pb-3">
        <div>
          <p className="font-display text-2xl uppercase leading-none text-mind-ink">MIND.</p>
          <p className="mt-1 text-[8px] font-medium uppercase tracking-[0.16em] text-mind-muted">
            {label}
          </p>
        </div>
        <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-mind-muted">
          {page}
        </p>
      </div>
      {children}
    </article>
  );
}

export function ReportPreview({ report }: ReportPreviewProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
      <article className="aspect-[595/842] min-h-[260px] overflow-hidden rounded-2xl border border-[var(--color-rule)] bg-mind-bg p-4 shadow-mindSm">
        <div className="space-y-1 font-display text-[42px] uppercase leading-[0.82] text-mind-ink">
          <p>MIND</p>
          <p className="text-mind-blob">OUT</p>
          <p>MIND</p>
          <p className="text-mind-blob">OUT</p>
        </div>
        <div className="mt-14 bg-mind-surface2 p-4">
          <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-mind-blob-deep">
            {report.labels.coverKicker}
          </p>
          <h3 className="mt-3 font-display text-[34px] uppercase leading-[0.9] text-mind-ink">
            {report.industryName}
          </h3>
          <p className="mt-3 text-[10px] font-light leading-[1.45] text-mind-muted">
            {report.subtitle}
          </p>
        </div>
      </article>

      <PageShell label={report.labels.contents} page="02 / 05">
        <div className="mt-10">
          <h3 className="font-display text-[34px] uppercase leading-none text-mind-ink">{report.labels.contents}</h3>
          <div className="mt-8 space-y-5">
            {[
              report.labels.opportunityFrame,
              report.labels.timeLeaks,
              report.labels.workflows,
              report.labels.miniTools,
              report.labels.prompts,
              report.labels.outreach
            ].map((item, index) => (
              <div key={item} className="grid grid-cols-[34px_1fr_24px] items-center gap-3 border-b border-[var(--color-rule)] pb-2">
                <span className="font-display text-2xl text-mind-blob">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-[10px] font-light text-mind-ink">{item}</span>
                <span className="text-[9px] font-light text-mind-muted">0{Math.min(index + 3, 5)}</span>
              </div>
            ))}
          </div>
        </div>
      </PageShell>

      <PageShell label={report.labels.opportunityFrame} page="03 / 05">
        <div className="mt-12">
          <p className="font-display text-[58px] leading-none text-mind-blob">01</p>
          <p className="mt-4 text-[8px] font-medium uppercase tracking-[0.18em] text-mind-blob-deep">
            {report.labels.section01}
          </p>
          <h3 className="mt-4 font-display text-[34px] uppercase leading-[0.92] text-mind-ink">
            {report.industryName}
          </h3>
          <p className="mt-5 text-[10px] font-light leading-[1.5] text-mind-muted">
            {report.intro}
          </p>
          <div className="mt-9 bg-mind-blob-pale p-4">
            <p className="text-[8px] font-medium uppercase tracking-[0.16em] text-mind-blob-deep">
              {report.labels.firstWorkflow}
            </p>
            <h4 className="mt-2 font-display text-2xl uppercase leading-none text-mind-ink">
              {report.firstWorkflow.title}
            </h4>
            <SmallLine>{report.firstWorkflow.why}</SmallLine>
          </div>
        </div>
      </PageShell>

      <PageShell label={report.labels.timeLeaks} page="04 / 05">
        <div className="mt-8 grid grid-cols-2 gap-5">
          <div>
            <h3 className="font-display text-2xl uppercase leading-none text-mind-ink">{report.labels.timeLeaks}</h3>
            <div className="mt-5 space-y-3">
              {report.problems.slice(0, 4).map((problem, index) => (
                <div key={problem} className="grid grid-cols-[22px_1fr] gap-2">
                  <span className="font-display text-xl text-mind-blob">{index + 1}</span>
                  <SmallLine>{problem}</SmallLine>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl uppercase leading-none text-mind-ink">{report.labels.workflows}</h3>
            <div className="mt-5 space-y-4">
              {report.workflows.slice(0, 3).map((workflow) => (
                <div key={workflow.title}>
                  <p className="text-[10px] font-medium text-mind-ink">{workflow.title}</p>
                  <SmallLine>{workflow.summary}</SmallLine>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 bg-mind-surface2 p-3">
          <p className="text-[8px] font-medium uppercase tracking-[0.16em] text-mind-blob-deep">
            {report.labels.miniTools}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {report.miniTools.slice(0, 3).map((tool) => (
              <div key={tool.title}>
                <p className="text-[9px] font-medium leading-tight text-mind-ink">{tool.title}</p>
                <p className="mt-1 text-[8px] font-light leading-tight text-mind-muted">{tool.output}</p>
              </div>
            ))}
          </div>
        </div>
      </PageShell>

      <article className="aspect-[595/842] min-h-[260px] overflow-hidden rounded-2xl border border-[var(--color-rule)] bg-mind-bg p-4 shadow-mindSm">
        <div className="space-y-1 font-display text-[40px] uppercase leading-[0.82] text-mind-ink">
          <p>MIND</p>
          <p className="text-mind-blob">MIND</p>
          <p>OUT</p>
        </div>
        <div className="mt-16 bg-mind-surface2 p-4">
          <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-mind-blob-deep">
            {report.labels.outreach}
          </p>
          <p className="mt-4 text-[10px] font-light leading-[1.5] text-mind-muted">
            {report.outreachVariants[0]?.body}
          </p>
          <p className="mt-6 text-[8px] font-medium uppercase tracking-[0.18em] text-mind-blob-deep">
            {report.labels.followUp}
          </p>
          <p className="mt-3 text-[9px] font-light leading-[1.45] text-mind-muted">
            {report.followUp}
          </p>
        </div>
      </article>
    </div>
  );
}
