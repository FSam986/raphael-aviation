import "./globals.css";
import { Overpass, Overpass_Mono, Spectral } from "next/font/google";

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
    <html lang="en" className={`${overpass.variable} ${overpassMono.variable} ${spectral.variable}`}>
      <body className="bg-chart-ground text-chart-ink">
        {children}
      </body>
    </html>
  );
}
