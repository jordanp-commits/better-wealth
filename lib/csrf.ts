export function csrfHeaders(): Record<string, string> {
  if (typeof document === 'undefined') return {}
  const match = document.cookie.match(/(?:^|;\s*)csrf-token=([^;]+)/)
  if (!match) return {}
  return { 'x-csrf-token': match[1] }
}
