import { Html, Head, Main, NextScript } from "next/document";
import type { DocumentProps } from "next/document";

// Google Tag Manager container for Google Analytics 4, set up by SC's IT
// department. GA4 itself is configured inside this container, not here.
const GTM_ID = "GTM-MHKL83FF";

// Consent Mode v2 defaults. Under the ePrivacy rules (in Croatia, the Electronic
// Communications Act) analytics cookies need the visitor's prior consent, so
// everything except security storage starts denied: GTM loads, but tags gated
// on consent set no cookies until a consent banner calls
//   gtag('consent', 'update', { analytics_storage: 'granted' })
// These defaults must run before the GTM loader below.
const gtmSnippet = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted',
  wait_for_update: 500
});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`;

export default function Document(props: DocumentProps) {
  // Follow the active locale so assistive tech and search engines are told the
  // right language. Hardcoding "hr" would mislabel every /en page.
  const locale = props.__NEXT_DATA__?.locale ?? "hr";

  return (
    <Html lang={locale}>
      <Head>
        {/* Production builds only, so local development never reaches the
            live Analytics property. */}
        {process.env.NODE_ENV === "production" && (
          <script
            id="gtm"
            dangerouslySetInnerHTML={{ __html: gtmSnippet }}
          />
        )}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
