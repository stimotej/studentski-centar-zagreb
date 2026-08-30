/**
 * English names for the WordPress categories the site filters by.
 *
 * Category names are taxonomy terms, not post fields, so they have no `_en`
 * twin to read through `localized()`. They are also a small, stable,
 * structural set — the site's own sections and the student-service job
 * groups — so they are mapped here by name rather than given an editing UI.
 *
 * A name that is not in the map renders in Croatian, which is the same
 * fallback every translated field follows. A category added in wp-admin
 * therefore appears immediately and simply stays Croatian until it is added
 * below.
 *
 * The English must match ./ui.ts for the same term: "Prehrana" is the
 * navigation's "Dining" here too, never "Food".
 */

import { isEnglish } from "./i18n";

/** WordPress returns term names HTML-escaped ("Teatar &amp;TD"). */
const decode = (name: string) =>
  name.replace(/&amp;/g, "&").replace(/&#0?38;/g, "&");

const EN: Record<string, string> = {
  // ---- site sections (children of "Obavijesti") -----------------------
  Kultura: "Culture",
  Prehrana: "Dining",
  Smještaj: "Accommodation",
  Sport: "Sport",
  "Studentski servis": "Student service",
  Turizam: "Tourism",
  Catering: "Catering",
  Eventi: "Events",
  "Početna stranica": "Homepage",
  // "Teatar &TD" is a proper name and is deliberately absent.

  // ---- job groups (children of "Poslovi") -----------------------------
  "Administrativni poslovi": "Administrative work",
  "Fizički poslovi": "Manual work",
  "Instrukcije; Poduke; Rad s djecom":
    "Tutoring; Lessons; Working with children",
  "IT poslovi": "IT work",
  "Poslovi čišćenja": "Cleaning work",
  "Promidžba; Marketing": "Promotion; Marketing",
  "Rad u proizvodnji": "Production work",
  "Razni poslovi": "Miscellaneous work",
  "Skladišni poslovi": "Warehouse work",
  "Trgovina; Prodaja": "Retail; Sales",
  Ugostiteljstvo: "Hospitality",
};

/** Resolve one category name for a locale. Falls back to Croatian. */
export const categoryName = (
  locale: string | undefined,
  name: string | undefined,
): string => {
  if (!name) return "";
  if (!isEnglish(locale)) return name;
  return EN[decode(name)] ?? name;
};

export default categoryName;
