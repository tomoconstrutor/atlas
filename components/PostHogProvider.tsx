"use client";

import { useEffect, type ReactNode } from "react";
import { capturePageview, initPostHog } from "@/lib/analytics";

type PostHogProviderProps = {
  children: ReactNode;
};

export function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    initPostHog();
    capturePageview();
  }, []);

  return <>{children}</>;
}
