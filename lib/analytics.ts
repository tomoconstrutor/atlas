"use client";

import posthog from "posthog-js";

type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

const POSTHOG_TOKEN = process.env.NEXT_PUBLIC_POSTHOG_TOKEN;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

let posthogInitialized = false;
let pageviewCaptured = false;

export function initPostHog() {
  if (posthogInitialized || typeof window === "undefined" || !POSTHOG_TOKEN) {
    return;
  }

  posthog.init(POSTHOG_TOKEN, {
    api_host: POSTHOG_HOST,
    capture_pageview: false
  });
  posthogInitialized = true;
}

export function captureEvent(eventName: string, properties?: AnalyticsProperties) {
  if (!posthogInitialized) {
    return;
  }

  posthog.capture(eventName, properties);
}

export function capturePageview() {
  if (pageviewCaptured || typeof window === "undefined") {
    return;
  }

  captureEvent("$pageview", {
    $current_url: window.location.href
  });
  pageviewCaptured = true;
}
