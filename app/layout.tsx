import type { Metadata, Viewport } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const description =
  "AI Engineer building computer vision, deep learning, retrieval, automation, and Python systems.";

export const metadata: Metadata = {
  title: {
    default: "Mahmoud Ahmed Farouk | AI Engineer",
    template: "%s | Mahmoud Ahmed Farouk",
  },
  description,
  applicationName: "Mahmoud Ahmed Farouk — AI Engineer",
  openGraph: {
    title: "Mahmoud Ahmed Farouk | AI Engineer",
    description,
    siteName: "Mahmoud Ahmed Farouk",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mahmoud Ahmed Farouk | AI Engineer",
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#040611",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
