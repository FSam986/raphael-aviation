import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Perf + hygiene
  poweredByHeader: false,            // don't advertise the framework
  compress: true,                    // gzip responses
  reactStrictMode: true,
  productionBrowserSourceMaps: false, // smaller prod deploy, no source leak
  // Tree-shake large packages' imports down to what is actually used.
  experimental: {
    optimizePackageImports: ["@supabase/supabase-js", "@supabase/ssr"],
  },
};

export default nextConfig;
