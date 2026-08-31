# studentski-centar-zagreb

Public site for Studentski centar Zagreb. A **headless Next.js frontend
(Pages Router)** over the WordPress REST API at `www.sczg.unizg.hr`. It owns no
content: everything editable comes from WordPress and is edited in the
`studentski-centar-admin-react` admin.

## Bilingual content, HR/EN

Croatian is the source of truth. English lives beside it in `<key>_en` post
meta, written by editors in the admin.

- `src/utils/i18n.ts` — `localized(locale, hr, en)` for **content** from
  WordPress. Falls back to Croatian per field, and never the other way, so a
  half-translated page renders mixed rather than broken or leaking English onto
  the Croatian site.
- `src/utils/ui.ts` — `useUI()` for the site's own **chrome** (buttons,
  headings, empty states). Called `ui`, not `t`, because several pages already
  use `t` for content.
- `src/utils/categoryName.ts` — WordPress category names, which are taxonomy
  terms and so have no `_en` twin.
- Croatian is the default locale and keeps every existing URL. English is
  served under `/en`.

Conventions, and the migration's history, live in the admin repo under
`docs/i18n/`.

## TODO: the language selector

**There is no way to switch language in the UI yet.** Whoever builds it must
also do these two things, which exist only because it is missing:

1. **Remove the `noindex` on English pages.** `src/components/shared/Layout.tsx`
   emits `<meta name="robots" content="noindex, follow">` for `/en`. It is
   there because the English is unreviewed and unreachable except by typing the
   URL, while the `hreflang` tags beside it would otherwise have Google index
   it. Once the selector ships and the translations have been read by a Croatian
   speaker, delete that block — the `hreflang` and canonical tags are already
   correct and should stay.
2. **Check what is still Croatian.** Jobs (~726) and events (~460) are
   deliberately untranslated, so an English visitor sees Croatian job adverts
   and course listings. Decide whether the selector should be hidden on those
   pages, or whether that content gets translated first.

## Verifying a translation change

Source scanning has repeatedly under-reported here. The check that works is
comparing the **built** pages: a string is only really translated if the
English page differs from the Croatian one.

```bash
npm run build
# then diff .next/server/pages/en/<page>.html against .next/server/pages/hr/<page>.html
```

## Commands

```bash
npm run dev
npm run build
npx tsc --noEmit
```

`NEXT_PUBLIC_SC_API_URL` points at the WordPress REST API;
`NEXT_PUBLIC_SITE_URL` is the absolute origin used for hreflang and canonical;
`REVALIDATION_SECRET` guards `/api/revalidate`, which WordPress calls on save
and which revalidates both locales.
