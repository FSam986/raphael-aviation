import "./globals.css";
import ContentShield from "./components/ContentShield";
import ScreenshotGuard from "./components/ScreenshotGuard";
import UpdateWatcher from "./components/UpdateWatcher";
import { Overpass, Overpass_Mono, Spectral, Barlow_Condensed } from "next/font/google";

const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-barlow", display: "swap" });

const overpass = Overpass({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-overpass",
  display: "swap",
});
const overpassMono = Overpass_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-overpass-mono",
  display: "swap",
});
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

export const metadata = {
  title: "Raphael Aviation",
  description: "SACAA CPL study & exam prep",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${overpass.variable} ${overpassMono.variable} ${spectral.variable} ${barlow.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("night")==="1")document.documentElement.classList.add("night")}catch(e){}` }} /></head>
      <body className="bg-chart-ground text-chart-ink">
        {children}
        <ContentShield />
        <ScreenshotGuard />
        <UpdateWatcher />
      </body>
    </html>
  );
}
