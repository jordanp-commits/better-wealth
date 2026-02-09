// Cookie consent management utilities

export type CookieCategory = 'essential' | 'analytics' | 'marketing'

export interface CookieConsent {
  essential: boolean // Always true, cannot be disabled
  analytics: boolean
  marketing: boolean
  timestamp: number
}

const CONSENT_KEY = 'cookie-consent'

/**
 * Get current cookie consent preferences from localStorage
 */
export function getConsentPreferences(): CookieConsent | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) return null
    return JSON.parse(stored) as CookieConsent
  } catch {
    return null
  }
}

/**
 * Save cookie consent preferences to localStorage
 */
export function saveConsentPreferences(consent: Omit<CookieConsent, 'essential' | 'timestamp'>): void {
  if (typeof window === 'undefined') return

  const fullConsent: CookieConsent = {
    essential: true, // Always true
    analytics: consent.analytics,
    marketing: consent.marketing,
    timestamp: Date.now(),
  }

  localStorage.setItem(CONSENT_KEY, JSON.stringify(fullConsent))

  // Dispatch custom event so other components can react to consent changes
  window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: fullConsent }))
}

/**
 * Check if user has given consent for a specific category
 */
export function hasConsentFor(category: CookieCategory): boolean {
  if (category === 'essential') return true

  const consent = getConsentPreferences()
  if (!consent) return false

  return consent[category] === true
}

/**
 * Check if user has made any consent choice
 */
export function hasConsentChoice(): boolean {
  return getConsentPreferences() !== null
}

/**
 * Accept all cookies
 */
export function acceptAllCookies(): void {
  saveConsentPreferences({
    analytics: true,
    marketing: true,
  })
}

/**
 * Reject non-essential cookies
 */
export function rejectNonEssentialCookies(): void {
  saveConsentPreferences({
    analytics: false,
    marketing: false,
  })
}

/**
 * Clear consent preferences (for testing or allowing user to re-choose)
 */
export function clearConsentPreferences(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CONSENT_KEY)
}
