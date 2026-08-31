import { Html, Head, Main, NextScript } from "next/document";
import type { DocumentProps } from "next/document";
import Script from "next/script";

export default function Document(props: DocumentProps) {
  // Follow the active locale so assistive tech and search engines are told the
  // right language. Hardcoding "hr" would mislabel every /en page.
  const locale = props.__NEXT_DATA__?.locale ?? "hr";

  return (
    <Html lang={locale}>
      <Head>
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
