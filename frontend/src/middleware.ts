import { NextResponse, type NextRequest } from "next/server";

// Edge middleware: runs on every request. Two jobs —
//  1. Security headers (defence-in-depth: clickjacking, sniffing, referrer leak,
//     transport security, and a Content-Security-Policy that pins script/style/
//     connect origins to self + Supabase).
//  2. Honeypot tripwires: common vulnerability-scanner paths never used by this
//     app. A hit is almost certainly a bot/attacker probing; we log it (visible
//     in the server logs) and return a flat 404 so the scanner learns nothing.

// Paths real users never request — every one is a known scanner/exploit probe.
const HONEYPOT = [
  "/wp-login.php", "/wp-admin", "/xmlrpc.php", "/.env", "/.git", "/.aws",
  "/phpmyadmin", "/adminer.php", "/config.php", "/.ssh", "/vendor/",
  "/wp-content", "/.well-known/security.txt.bak", "/shell", "/cgi-bin/",
  "/administrator/", "/.vscode", "/backup.sql", "/dump.sql", "/id_rsa",
];

function securityHeaders(res: NextResponse) {
  const csp = [
    "default-src 'self'",
    // Next.js injects a small inline bootstrap; Tailwind uses inline styles.
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join("; ");
  res.headers.set("Content-Security-Policy", csp);
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.headers.set("X-DNS-Prefetch-Control", "off");
  return res;
}

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname.toLowerCase();

  // Honeypot: flat 404 for scanner probes, logged for monitoring.
  if (HONEYPOT.some((p) => path.startsWith(p) || path.includes(p))) {
    console.warn(`[honeypot] probe ${req.method} ${req.nextUrl.pathname} from ${req.headers.get("x-forwarded-for") || "?"} ua="${req.headers.get("user-agent") || "?"}"`);
    return new NextResponse("Not found", { status: 404 });
  }

  return securityHeaders(NextResponse.next());
}

// Run on everything except Next internals and static assets (keeps it cheap).
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|figures/|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt)$).*)"],
};
