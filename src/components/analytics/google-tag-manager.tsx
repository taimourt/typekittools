"use client";

import Script from "next/script";

export function GoogleTagManager() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtm.js?id=GTM-WBJRMSSR"
        strategy="afterInteractive"
      />
      <Script
        id="gtm-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
        }}
      />
    </>
  );
}

