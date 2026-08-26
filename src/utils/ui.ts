/**
 * Static interface text, HR/EN.
 *
 * This is for the site's own chrome — navigation, buttons, headings, empty
 * states. Editable *content* does not belong here: that lives in WordPress and
 * is read through `localized()` in ./i18n.
 *
 * Croatian is the source of truth. A missing English entry falls back to
 * Croatian rather than showing a key, so a half-finished translation degrades
 * into a mixed page instead of a broken one — the same rule content follows.
 *
 *   const t = useUI();
 *   <button>{t("common.readMore")}</button>
 */

import { useRouter } from "next/router";
import { isEnglish } from "./i18n";

/** Croatian is the complete set; English may lag behind it. */
export const HR = {
  // ---- navigation ----------------------------------------------------
  "nav.main": "Glavna navigacija",
  "nav.home": "Početna",
  "nav.obavijesti": "Obavijesti",
  "nav.studentServis": "Student servis",
  "nav.poslovi": "Poslovi",
  "nav.prehrana": "Prehrana",
  "nav.smjestaj": "Smještaj",
  "nav.sport": "Sport",
  "nav.kultura": "Kultura",
  "nav.turizam": "Turizam",
  "nav.catering": "Catering",
  "nav.najamProstora": "Najam prostora",
  "nav.mediji": "Mediji",
  "nav.teatarTd": "Teatar &TD",
  "nav.francuskiPaviljon": "Francuski paviljon",
  "nav.prijava": "Prijava",
  "nav.prijavaStudent": "Prijava student",
  "nav.prijavaPoslodavac": "Prijava poslodavac",
  "nav.zaposlenici": "Zaposlenici",
  "nav.accessibility": "Pristupačnost",

  // ---- common UI -----------------------------------------------------
  "common.readMore": "Saznaj više",
  "common.faq": "Često postavljana pitanja",
  "common.questionsAndHelp": "Pitanja i pomoć",
  "common.contact": "Kontakt",
  "common.workingHours": "Radno vrijeme blagajni",
  "common.location": "Lokacija",
  "common.relatedContent": "Popratni sadržaj",
  "common.documents": "Dokumenti",
  "common.gallery": "Galerija",

  // ---- empty states --------------------------------------------------
  "empty.obavijesti": "Nema obavijesti za prikaz",
  "empty.faq": "Nema pitanja za prikaz",
  "empty.notFound": "Nije pronađena obavijest",

  // ---- organisation --------------------------------------------------
  "org.name": "Studentski centar u Zagrebu",
  "org.university": "Sveučilište u Zagrebu",
} as const;

export type UIKey = keyof typeof HR;

/** Only the keys that have been translated need to appear here. */
export const EN: Partial<Record<UIKey, string>> = {
  "nav.main": "Main navigation",
  "nav.home": "Home",
  "nav.obavijesti": "News",
  "nav.studentServis": "Student service",
  "nav.poslovi": "Jobs",
  "nav.prehrana": "Dining",
  "nav.smjestaj": "Accommodation",
  "nav.sport": "Sport",
  "nav.kultura": "Culture",
  "nav.turizam": "Tourism",
  "nav.catering": "Catering",
  "nav.najamProstora": "Venue hire",
  "nav.mediji": "Media",
  // Proper names stay as they are.
  "nav.teatarTd": "Teatar &TD",
  "nav.francuskiPaviljon": "Francuski paviljon",
  "nav.prijava": "Sign in",
  "nav.prijavaStudent": "Student sign-in",
  "nav.prijavaPoslodavac": "Employer sign-in",
  "nav.zaposlenici": "Staff",
  "nav.accessibility": "Accessibility",

  "common.readMore": "Read more",
  "common.faq": "Frequently asked questions",
  "common.questionsAndHelp": "Questions and help",
  "common.contact": "Contact",
  "common.workingHours": "Cashier opening hours",
  "common.location": "Location",
  "common.relatedContent": "Facilities",
  "common.documents": "Documents",
  "common.gallery": "Gallery",

  "empty.obavijesti": "No news to show",
  "empty.faq": "No questions to show",
  "empty.notFound": "Notice not found",

  "org.name": "Studentski centar u Zagrebu",
  "org.university": "University of Zagreb",
};

/** Resolve one key for a locale. Falls back to Croatian, never to the key. */
export const uiString = (locale: string | undefined, key: UIKey): string =>
  (isEnglish(locale) ? EN[key] : undefined) ?? HR[key];

/** Hook form, for components that already run on the client. */
export const useUI = () => {
  const { locale } = useRouter();
  return (key: UIKey) => uiString(locale, key);
};
