import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { site } from "@/config/site";
import "./globals.css";

// Three roles: display (Space Grotesk), body/UI (Inter), mono labels (JetBrains).
// Each exposes a CSS variable that tailwind.config.ts maps to a font family.
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Computer Engineer`,
    template: `%s — ${site.name}`,
  },
  description:
    "Ishan Bijukuchhay is a Computer Engineering student at Queen's University focused on hardware, firmware, and the software around them — building projects across embedded systems, robotics, and the web.",
  keywords: [
    "Ishan Bijukuchhay",
    "Computer Engineering",
    "Queen's University",
    "Firmware",
    "Embedded Systems",
    "Hardware",
    "Robotics",
    "C Programming",
    "Raspberry Pi",
    "Microcontrollers",
    "Arduino",
    "Low-Level Programming",
    "Systems Programming",
    "Software Engineer",
    "Portfolio",
    "Smith Engineering",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    title: `${site.name} — Computer Engineer`,
    description:
      "Computer Engineering @ Queen's · hardware, firmware, and the software around them. A log of what I've built and what it taught me.",
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Computer Engineer`,
    description:
      "Computer Engineering @ Queen's · hardware, firmware, and the software around them.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};