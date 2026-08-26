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

  "smjestaj.pageTitle": "Smještaj",
  "smjestaj.dorms": "Studentski domovi",
  "smjestaj.dormsUpper": "STUDENTSKI DOMOVI",
  "smjestaj.stay": "Boravak u studentskome domu",
  "smjestaj.criteria":
    "Poštovani budući stanari studentskih domova, za boravak u studentskome domu potrebno je ispuniti slijedeći kriteriji:",
  "smjestaj.applyTender": "Prijava za natječaj",
  "smjestaj.applyVia":
    "Za prijavu na natječaj za studentski smještaj prijavite se putem linka  nastavku.",
  "smjestaj.counselling": "SAVJETOVALIŠTE",
  "smjestaj.intro":
    "SC Zagreb nudi smještaj u 4 studentska doma na atraktivnim lokacijama u gradu Zagrebu.",
  "smjestaj.newsTitle": "Obavijesti - studentski smještaj",
  "cards.contact": "Kontakt",
  "cards.settlements": "Naselja",
  "cards.tender": "Natječaj",
  "cards.prehranaUpper": "PREHRANA",
  "cards.smjestajUpper": "SMJEŠTAJ",
  "cards.studentServisUpper": "STUDENT SERVIS",
  "cards.jobs": "Poslovi",
  "cards.becomeMember": "Postani član",
  "cards.signIn": "Prijava",
  "cards.restaurants": "Restorani",
  "kultura.pageTitle": "Kultura",
  "kultura.today": "Danas",
  "kultura.goToList": "Idi na popis",
  "kultura.eventCalendar": "Kalendar evenata",
  "kultura.noEventsToday": "Nema evenata na današnji dan",
  "kultura.coursesWorkshops": "Tečajevi i radionice",
  "common.readMoreUpper": "SAZNAJ VIŠE",
  "sport.yearRound": "CJELOGODIŠNJE",
  "sport.educational": "EDUKACIJSKE AKTIVNOSTI",
  "sport.information": "INFORMACIJE",
  "sport.competitive": "NATJECATELJSKE AKTIVNOSTI",
  "sport.occasional": "POVREMENE",
  "sport.recreational": "REKREACIJSKE AKTIVNOSTI",
  "sport.photos": "SLIKE",
  "sport.sporting": "SPORTSKE",
  "sport.professional": "STRUČNE",
  "sport.social": "ZABAVNE AKTIVNOSTI",
  "prehrana.dailyMenu": "Dnevni meni",
  "prehrana.breakfast": "Doručak",
  "prehrana.lunch": "Ručak",
  "prehrana.dinner": "Večera",
  "prehrana.choice": "Izbor",
  "prehrana.sides": "Prilozi",
  "prehrana.menu": "Menu",
  "prehrana.vegetarian": "Vegeterijanski menu",
  "empty.menus": "Nema menija za prikaz",
  "home.information": "Informacije",
  "home.calendar": "Kalendar",
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

  "smjestaj.pageTitle": "Accommodation",
  "smjestaj.dorms": "Student halls",
  "smjestaj.dormsUpper": "STUDENT HALLS",
  "smjestaj.stay": "Living in a student hall",
  "smjestaj.criteria":
    "Dear future residents, the following criteria must be met in order to live in a student hall:",
  "smjestaj.applyTender": "Apply to the call",
  "smjestaj.applyVia":
    "To apply for student accommodation, use the link below.",
  "smjestaj.counselling": "COUNSELLING",
  "smjestaj.intro":
    "SC Zagreb offers accommodation in four student halls in attractive locations across Zagreb.",
  "smjestaj.newsTitle": "News — student accommodation",
  "cards.contact": "Contact",
  "cards.settlements": "Villages",
  "cards.tender": "Call for applications",
  "cards.prehranaUpper": "DINING",
  "cards.smjestajUpper": "ACCOMMODATION",
  "cards.studentServisUpper": "STUDENT SERVICE",
  "cards.jobs": "Jobs",
  "cards.becomeMember": "Become a member",
  "cards.signIn": "Sign in",
  "cards.restaurants": "Restaurants",
  "kultura.pageTitle": "Culture",
  "kultura.today": "Today",
  "kultura.goToList": "Go to the list",
  "kultura.eventCalendar": "Event calendar",
  "kultura.noEventsToday": "No events today",
  "kultura.coursesWorkshops": "Courses and workshops",
  "common.readMoreUpper": "READ MORE",
  "sport.yearRound": "YEAR-ROUND",
  "sport.educational": "EDUCATIONAL ACTIVITIES",
  "sport.information": "INFORMATION",
  "sport.competitive": "COMPETITIVE ACTIVITIES",
  "sport.occasional": "OCCASIONAL",
  "sport.recreational": "RECREATIONAL ACTIVITIES",
  "sport.photos": "PHOTOS",
  "sport.sporting": "SPORTING",
  "sport.professional": "PROFESSIONAL",
  "sport.social": "SOCIAL ACTIVITIES",
  "prehrana.dailyMenu": "Daily menu",
  "prehrana.breakfast": "Breakfast",
  "prehrana.lunch": "Lunch",
  "prehrana.dinner": "Dinner",
  "prehrana.choice": "Choice",
  "prehrana.sides": "Sides",
  "prehrana.menu": "Menu",
  "prehrana.vegetarian": "Vegetarian menu",
  "empty.menus": "No menus to show",
  "home.information": "Information",
  "home.calendar": "Calendar",
};

/** Resolve one key for a locale. Falls back to Croatian, never to the key. */
export const uiString = (locale: string | undefined, key: UIKey): string =>
  (isEnglish(locale) ? EN[key] : undefined) ?? HR[key];

/** Hook form, for components that already run on the client. */
export const useUI = () => {
  const { locale } = useRouter();
  return (key: UIKey) => uiString(locale, key);
};
