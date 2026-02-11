import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_ROUTES = ['/api/contact', '/api/newsletter', '/api/create-checkout-session']
const TOKEN_MAX_AGE_MS = 24 * 60 * 60 * 1000 // 24 hours

async function hmacSign(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function hmacVerify(data: string, signature: string, secret: string): Promise<boolean> {
  const expected = await hmacSign(data, secret)
  if (expected.length !== signature.length) return false
  // Constant-time comparison
  let mismatch = 0
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i)
  }
  return mismatch === 0
}

export async function middleware(request: NextRequest) {
  const secret = process.env.CSRF_SECRET
  if (!secret) return NextResponse.next()

  const { method, pathname } = { method: request.method, pathname: request.nextUrl.pathname }

  // Set CSRF token cookie on GET requests to pages (not API routes, not static assets)
  if (method === 'GET' && !pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    const timestamp = Date.now().toString()
    const signature = await hmacSign(timestamp, secret)
    const token = `${timestamp}.${signature}`
    response.cookies.set('csrf-token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })
    return response
  }

  // Validate CSRF token on POST requests to protected routes
  if (method === 'POST' && PROTECTED_ROUTES.some((route) => pathname === route)) {
    const cookieToken = request.cookies.get('csrf-token')?.value
    const headerToken = request.headers.get('x-csrf-token')

    if (!cookieToken || !headerToken || cookieToken !== headerToken) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 })
    }

    const parts = cookieToken.split('.')
    if (parts.length !== 2) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 })
    }

    const [timestamp, signature] = parts

    // Verify HMAC signature
    const valid = await hmacVerify(timestamp, signature, secret)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 })
    }

    // Check token expiry
    const tokenAge = Date.now() - parseInt(timestamp, 10)
    if (isNaN(tokenAge) || tokenAge > TOKEN_MAX_AGE_MS) {
      return NextResponse.json({ error: 'CSRF token expired' }, { status: 403 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     * - /api/stripe/* (Stripe webhook has its own signature verification)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|api/stripe).*)',
  ],
}
