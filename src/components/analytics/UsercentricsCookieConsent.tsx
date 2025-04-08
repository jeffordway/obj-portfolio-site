'use client';

import Script from 'next/script';

/**
 * UsercentricsCookieConsent component
 * 
 * Implements Usercentrics cookie consent management using Next.js Script component.
 * Uses the beforeInteractive strategy to ensure scripts load before any page hydration.
 */
export function UsercentricsCookieConsent() {
  return (
    <>
      {/* Usercentrics Cookie Consent Management */}
      <Script
        src="https://web.cmp.usercentrics.eu/modules/autoblocker.js"
        strategy="beforeInteractive"
      />
      <Script
        id="usercentrics-cmp"
        src="https://web.cmp.usercentrics.eu/ui/loader.js"
        data-settings-id="fcqZDSJeT1abLZ"
        strategy="beforeInteractive"
        async
      />
    </>
  );
}
