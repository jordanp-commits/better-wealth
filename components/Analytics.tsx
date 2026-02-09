'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { hasConsentFor, getConsentPreferences } from '@/lib/cookies'

// Replace these with your actual tracking IDs
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || ''

export default function Analytics() {
  const [analyticsConsent, setAnalyticsConsent] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)

  useEffect(() => {
    // Check consent on mount
    setAnalyticsConsent(hasConsentFor('analytics'))
    setMarketingConsent(hasConsentFor('marketing'))

    // Listen for consent changes
    const handleConsentChange = () => {
      const prefs = getConsentPreferences()
      if (prefs) {
        setAnalyticsConsent(prefs.analytics)
        setMarketingConsent(prefs.marketing)
      }
    }

    window.addEventListener('cookieConsentChanged', handleConsentChange)
    return () => window.removeEventListener('cookieConsentChanged', handleConsentChange)
  }, [])

  return (
    <>
      {/* Google Analytics - Only loads if analytics consent is given */}
      {analyticsConsent && GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel - Only loads if marketing consent is given */}
      {marketingConsent && META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* LinkedIn Insight Tag - Only loads if marketing consent is given */}
      {marketingConsent && LINKEDIN_PARTNER_ID && (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})(window.lintrk);
          `}
        </Script>
      )}

      {/* Meta Pixel noscript fallback - Only if marketing consent given */}
      {marketingConsent && META_PIXEL_ID && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}
    </>
  )
}
