'use client';

/**
 * UsercentricsCookieConsent component
 * 
 * Provides a CSS fix to ensure the cookie banner appears above all other elements.
 * The actual scripts are loaded in the root layout for better compatibility.
 */
export function UsercentricsCookieConsent() {
  return (
    <>
      {/* CSS fix to ensure the cookie banner appears above all other elements */}
      <style jsx global>{`
        #usercentrics-root {
          position: relative;
          z-index: 9999 !important; /* Ensure it's above all other elements */
        }
      `}</style>
    </>
  );
}
