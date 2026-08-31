/**
 * Bilingual content, HR/EN.
 *
 * Croatian is the source of truth and lives in the original WordPress fields.
 * English lives alongside it in `<key>_en` post meta, written by the admin at
 * /zaposlenici. See docs/i18n/CONVENTIONS.md in studentski-centar-admin-react.
 */

export const LOCALES = ["hr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "hr";

export const isEnglish = (locale?: string): boolean => locale === "en";

/**
 * A field counts as translated only if it holds non-whitespace text.
 *
 * Missing key, null, "" and "   " all mean "not translated yet" and fall back
 * to Croatian. Editors leave fields half-done for weeks — a partly translated
 * page must render mixed rather than showing holes.
 */
export const hasTranslation = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

/**
 * Pick the right language for one field.
 *
 *   localized(locale, post.meta.sadrzaj, post.meta.sadrzaj_en)
 *
 * Never falls back the other way: English must not leak onto the Croatian site.
 */
export const localized = <T extends string | undefined | null>(
  locale: string | undefined,
  hr: T,
  en?: string | null,
): string => {
  if (isEnglish(locale) && hasTranslation(en)) return en;
  return hr ?? "";
};
