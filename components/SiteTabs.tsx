"use client";

import { advisoryText } from "@/data/advisory";
import { captureEvent } from "@/lib/analytics";
import { text } from "@/lib/localize";
import type { Locale } from "@/types/content";

type SiteTab = "advisory" | "map";

type SiteTabsProps = {
  active: SiteTab;
  locale: Locale;
  className?: string;
};

const tabs: Array<{ id: SiteTab; label: typeof advisoryText.tabs.advisory; href: string }> = [
  { id: "advisory", label: advisoryText.tabs.advisory, href: "/" },
  { id: "map", label: advisoryText.tabs.map, href: "/map/" }
];

export function SiteTabs({ active, locale, className = "" }: SiteTabsProps) {
  return (
    <div
      className={`inline-flex rounded-full border border-[var(--color-rule)] bg-mind-surface2 p-1 shadow-mindSm ${className}`}
      aria-label="Atlas sections"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;

        return (
          <a
            key={tab.id}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            onClick={() =>
              captureEvent("tab_switched", {
                tab: tab.id
              })
            }
            className={`inline-flex min-h-9 items-center justify-center rounded-full px-4 text-[11px] font-medium uppercase tracking-[0.14em] transition ${
              isActive
                ? "bg-mind-ink text-mind-bg"
                : "text-mind-muted hover:text-mind-ink"
            }`}
          >
            {text(tab.label, locale)}
          </a>
        );
      })}
    </div>
  );
}
