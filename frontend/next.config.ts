import type { NextConfig } from "next";

// One id per deploy (Vercel commit SHA, else build time) — see UpdateWatcher.
const APP_VERSION = process.env.VERCEL_GIT_COMMIT_SHA ?? (process.env.NODE_ENV === "production" ? String(Date.now()) : "dev");

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_APP_VERSION: APP_VERSION },
  // Perf + hygiene
  poweredByHeader: false,            // don't advertise the framework
  compress: true,                    // gzip responses
  reactStrictMode: true,
  productionBrowserSourceMaps: false, // smaller prod deploy, no source leak
  // Tree-shake large packages' imports down to what is actually used.
  experimental: {
    optimizePackageImports: ["@supabase/supabase-js", "@supabase/ssr"],
  },
  // Figures aren't content-hashed, so cache for 30 days and revalidate in the
  // background rather than marking them immutable.
  async headers() {
    return [
      { source: "/figures/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=604800" }] },
    ];
  },
};

export default nextConfig;
