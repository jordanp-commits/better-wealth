/**
 * HTML-encode a string for safe interpolation into HTML templates.
 * Prevents XSS by converting dangerous characters to HTML entities.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Strip HTML tags and trim whitespace from user input.
 * Use at API boundaries before storing or forwarding data.
 */
export function sanitizeInput(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim()
}
