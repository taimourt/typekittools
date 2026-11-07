import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE_NAME = process.env.ADMIN_SESSION_COOKIE || "tkt_admin_session";

// In-memory sliding window rate limiter for admin authentication
const authRateLimit = new Map<string, { count: number; resetAt: number }>();
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

// Hardcoded fast redirect table for immediate edge execution
const REDIRECT_MAP: Record<string, { target: string; status: number }> = {
  "/alt-codes": { target: "/tools/symbols/alt-code-finder", status: 301 },
  "/emojis": { target: "/tools/emoji/emoji-library", status: 301 },
  "/json-formatter": { target: "/tools/developer/json-formatter", status: 301 },
  "/hash-generator": { target: "/tools/developer/hash-generator", status: 301 },
  "/unix-timestamp": { target: "/tools/developer/timestamp-converter", status: 301 },
  "/diff-checker": { target: "/tools/developer/diff-checker", status: 301 },
  "/regex-tester": { target: "/tools/developer/regex-tester", status: 301 },
  "/tools/unicode/zero-width-cleaner": { target: "/tools/unicode/invisible-character-tool", status: 301 },
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

  // 1. Check permanent 301 / 308 redirects
  if (REDIRECT_MAP[pathname]) {
    const { target, status } = REDIRECT_MAP[pathname];
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url, status);
  }

  // 2. Brute-force rate limiting protection on Admin Login API
  if (pathname === "/api/admin/auth/login" && request.method === "POST") {
    const now = Date.now();
    const entry = authRateLimit.get(ip);

    if (entry) {
      if (now < entry.resetAt) {
        if (entry.count >= MAX_LOGIN_ATTEMPTS) {
          const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);
          return new NextResponse(
            JSON.stringify({
              error: `Too many login attempts. Account temporarily locked for security. Try again in ${retryAfterSec} seconds.`,
            }),
            {
              status: 429,
              headers: {
                "Content-Type": "application/json",
                "Retry-After": String(retryAfterSec),
              },
            }
          );
        }
        entry.count += 1;
      } else {
        authRateLimit.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
      }
    } else {
      authRateLimit.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    }
  }

  // 3. Admin Route Protection
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME);
    if (!sessionCookie?.value) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  // 4. Forward request with x-pathname and x-real-ip headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-client-ip", ip);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, robots.txt, sitemap.xml
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
