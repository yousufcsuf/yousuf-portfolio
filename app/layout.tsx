import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const bodyFont = localFont({
  src: "./fonts/gt.woff",
  variable: "--font-body-face",
  weight: "400",
  style: "normal",
  display: "swap",
});

const displayFont = localFont({
  src: "./fonts/acorn.woff",
  variable: "--font-display-face",
  weight: "700",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yousuf — Software & AI Engineer",
  description:
    "I build reliable software, intelligent applications, and thoughtful digital experiences. Explore Yousuf’s selected work.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="ambient-background" aria-hidden="true" />
        <a href="#main" className="skip-link">Skip to content</a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
