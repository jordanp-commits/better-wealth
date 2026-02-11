'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  hasConsentChoice,
  getConsentPreferences,
  saveConsentPreferences,
  acceptAllCookies,
  rejectNonEssentialCookies,
} from '@/lib/cookies'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [marketingEnabled, setMarketingEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    if (!hasConsentChoice()) {
      setShowBanner(true)
      // Slight delay for slide-up animation
      setTimeout(() => setIsVisible(true), 100)
    } else {
      // Load existing preferences into state
      const prefs = getConsentPreferences()
      if (prefs) {
        setAnalyticsEnabled(prefs.analytics)
        setMarketingEnabled(prefs.marketing)
      }
    }
  }, [])

  const handleAcceptAll = () => {
    acceptAllCookies()
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
    setShowModal(false)
    // Reload to initialize analytics/marketing scripts
    window.location.reload()
  }

  const handleRejectNonEssential = () => {
    rejectNonEssentialCookies()
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
    setShowModal(false)
  }

  const handleSavePreferences = () => {
    saveConsentPreferences({
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
    })
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
    setShowModal(false)
    // Reload if any tracking was enabled
    if (analyticsEnabled || marketingEnabled) {
      window.location.reload()
    }
  }

  const openModal = () => {
    // Load current preferences
    const prefs = getConsentPreferences()
    if (prefs) {
      setAnalyticsEnabled(prefs.analytics)
      setMarketingEnabled(prefs.marketing)
    }
    setShowModal(true)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Banner */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[90] bg-white border-t-2 transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ borderColor: '#033A22' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-5">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Text Content */}
            <div className="flex-1">
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.7)' }}>
                We use cookies to improve your experience on our website. Essential cookies are required for the site to function, while analytics and marketing cookies help us understand how you use our site and show you relevant content.{' '}
                <Link
                  href="/cookie-policy"
                  className="underline hover:no-underline"
                  style={{ color: '#9d6d47' }}
                >
                  Learn more
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={openModal}
                className="text-sm font-medium px-4 py-2 transition-colors duration-200 hover:underline order-3 sm:order-1"
                style={{ color: '#033A22' }}
              >
                Manage Preferences
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="text-sm font-medium px-5 py-2.5 rounded-lg border transition-all duration-200 hover:bg-gray-50 order-2"
                style={{ borderColor: 'rgba(3, 58, 34, 0.3)', color: '#033A22' }}
              >
                Reject Non-Essential
              </button>
              <button
                onClick={handleAcceptAll}
                className="text-sm font-medium px-5 py-2.5 rounded-lg text-white transition-all duration-200 hover:opacity-90 order-1 sm:order-3"
                style={{ backgroundColor: '#C4926A' }}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif font-bold" style={{ color: '#033A22' }}>
                  Cookie Preferences
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close cookie preferences"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-base mt-2" style={{ color: 'rgba(0,0,0,0.5)' }}>
                Manage your cookie preferences below. Essential cookies cannot be disabled as they are required for the website to function.
              </p>
            </div>

            {/* Cookie Categories */}
            <div className="p-6 space-y-6">
              {/* Essential Cookies */}
              <div className="pb-5 border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold" style={{ color: '#033A22' }}>Essential Cookies</h3>
                  <div
                    className="relative w-12 h-6 rounded-full cursor-not-allowed"
                    style={{ backgroundColor: '#033A22' }}
                    role="switch"
                    aria-checked="true"
                    aria-label="Essential cookies enabled"
                  >
                    <div
                      className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white transition-transform"
                    />
                  </div>
                </div>
                <p className="text-base" style={{ color: 'rgba(0,0,0,0.5)' }}>
                  These cookies are necessary for the website to function and cannot be switched off. They include session management, booking system functionality, and storing your cookie preferences.
                </p>
                <p className="text-xs mt-2 italic" style={{ color: 'rgba(0,0,0,0.4)' }}>
                  Always enabled
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="pb-5 border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold" style={{ color: '#033A22' }}>Analytics Cookies</h3>
                  <button
                    onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                      analyticsEnabled ? '' : 'bg-gray-300'
                    }`}
                    style={analyticsEnabled ? { backgroundColor: '#033A22' } : {}}
                    role="switch"
                    aria-checked={analyticsEnabled}
                    aria-label="Toggle analytics cookies"
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                        analyticsEnabled ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-base" style={{ color: 'rgba(0,0,0,0.5)' }}>
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This includes Google Analytics for website performance tracking.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold" style={{ color: '#033A22' }}>Marketing Cookies</h3>
                  <button
                    onClick={() => setMarketingEnabled(!marketingEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                      marketingEnabled ? '' : 'bg-gray-300'
                    }`}
                    style={marketingEnabled ? { backgroundColor: '#033A22' } : {}}
                    role="switch"
                    aria-checked={marketingEnabled}
                    aria-label="Toggle marketing cookies"
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                        marketingEnabled ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-base" style={{ color: 'rgba(0,0,0,0.5)' }}>
                  These cookies are used to track visitors across websites and show you relevant advertisements. This includes Meta Pixel (Facebook/Instagram) and LinkedIn Pixel for advertising and retargeting purposes.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t flex flex-col sm:flex-row gap-3" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
              <button
                onClick={handleSavePreferences}
                className="flex-1 text-sm font-medium px-5 py-3 rounded-lg border transition-all duration-200 hover:bg-gray-50"
                style={{ borderColor: 'rgba(3, 58, 34, 0.3)', color: '#033A22' }}
              >
                Save Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 text-sm font-medium px-5 py-3 rounded-lg text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#C4926A' }}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/**
 * Standalone button to open cookie preferences
 * Can be used in footer or settings page
 */
export function CookiePreferencesButton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  const [showModal, setShowModal] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [marketingEnabled, setMarketingEnabled] = useState(false)

  const openModal = () => {
    const prefs = getConsentPreferences()
    if (prefs) {
      setAnalyticsEnabled(prefs.analytics)
      setMarketingEnabled(prefs.marketing)
    }
    setShowModal(true)
  }

  const handleSavePreferences = () => {
    saveConsentPreferences({
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
    })
    setShowModal(false)
    window.location.reload()
  }

  const handleAcceptAll = () => {
    acceptAllCookies()
    setShowModal(false)
    window.location.reload()
  }

  return (
    <>
      <button onClick={openModal} className={className} style={style}>
        Cookie Preferences
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif font-bold" style={{ color: '#033A22' }}>
                  Cookie Preferences
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close cookie preferences"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-base mt-2" style={{ color: 'rgba(0,0,0,0.5)' }}>
                Manage your cookie preferences below. Essential cookies cannot be disabled as they are required for the website to function.
              </p>
            </div>

            {/* Cookie Categories */}
            <div className="p-6 space-y-6">
              {/* Essential Cookies */}
              <div className="pb-5 border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold" style={{ color: '#033A22' }}>Essential Cookies</h3>
                  <div
                    className="relative w-12 h-6 rounded-full cursor-not-allowed"
                    style={{ backgroundColor: '#033A22' }}
                    role="switch"
                    aria-checked="true"
                    aria-label="Essential cookies enabled"
                  >
                    <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                  </div>
                </div>
                <p className="text-base" style={{ color: 'rgba(0,0,0,0.5)' }}>
                  These cookies are necessary for the website to function and cannot be switched off.
                </p>
                <p className="text-xs mt-2 italic" style={{ color: 'rgba(0,0,0,0.4)' }}>
                  Always enabled
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="pb-5 border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold" style={{ color: '#033A22' }}>Analytics Cookies</h3>
                  <button
                    onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                      analyticsEnabled ? '' : 'bg-gray-300'
                    }`}
                    style={analyticsEnabled ? { backgroundColor: '#033A22' } : {}}
                    role="switch"
                    aria-checked={analyticsEnabled}
                    aria-label="Toggle analytics cookies"
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                        analyticsEnabled ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-base" style={{ color: 'rgba(0,0,0,0.5)' }}>
                  Help us understand how visitors interact with our website.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold" style={{ color: '#033A22' }}>Marketing Cookies</h3>
                  <button
                    onClick={() => setMarketingEnabled(!marketingEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                      marketingEnabled ? '' : 'bg-gray-300'
                    }`}
                    style={marketingEnabled ? { backgroundColor: '#033A22' } : {}}
                    role="switch"
                    aria-checked={marketingEnabled}
                    aria-label="Toggle marketing cookies"
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                        marketingEnabled ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-base" style={{ color: 'rgba(0,0,0,0.5)' }}>
                  Used to show you relevant advertisements across platforms.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t flex flex-col sm:flex-row gap-3" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
              <button
                onClick={handleSavePreferences}
                className="flex-1 text-sm font-medium px-5 py-3 rounded-lg border transition-all duration-200 hover:bg-gray-50"
                style={{ borderColor: 'rgba(3, 58, 34, 0.3)', color: '#033A22' }}
              >
                Save Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 text-sm font-medium px-5 py-3 rounded-lg text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#C4926A' }}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
