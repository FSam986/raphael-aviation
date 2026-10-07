import type { CapacitorConfig } from "@capacitor/cli";

// This app is server-rendered (API routes + Supabase auth), so the native shell
// loads the deployed site rather than a static bundle.
// After deploying to Vercel, set server.url to that https URL and run:
//   npx cap sync
const config: CapacitorConfig = {
  appId: "com.raphaelaviation.app",
  appName: "Raphael Aviation",
  webDir: "capacitor/www", // offline fallback shown if server.url is unreachable
  // server: { url: "https://<your-app>.vercel.app", cleartext: false },
};

export default config;
