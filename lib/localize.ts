import type { Locale, LocalizedText } from "@/types/content";

export function text(value: LocalizedText, locale: Locale) {
  return value[locale] || value.en || value.pt || "";
}

export function hasText(value: LocalizedText) {
  return Boolean(value.en.trim() || value.pt.trim());
}

export function hasItems(items: string[]) {
  return items.some((item) => item.trim().length > 0);
}
