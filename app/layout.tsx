import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahmoud-farouk.dev"),
  title: {
    default: "Mahmoud farouk | Web Developer & AI Enthusiast",
    template: "%s | Mahmoud farouk",
  },
  description:
    "Modern portfolio for Mahmoud farouk, a Computer Science student focused on web development, AI, machine learning, and technical operations.",
  keywords: [
    "Mahmoud farouk",
    "web developer",
    "Laravel",
    "AI",
    "machine learning",
    "portfolio",
    "Cairo",
  ],
  openGraph: {
    title: "Mahmoud farouk | Web Developer & AI Enthusiast",
    description:
      "Projects, training, skills, certificates, and contact details for Mahmoud farouk.",
    type: "website",
    images: ["/images/profile-placeholder.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ea" },
    { media: "(prefers-color-scheme: dark)", color: "#080b12" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(()=>{try{const set=t=>{document.documentElement.dataset.theme=t;localStorage.setItem('theme',t)};const t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');set(t);document.addEventListener('click',e=>{const b=e.target&&e.target.closest&&e.target.closest('[data-theme-toggle]');if(!b)return;const c=document.documentElement.dataset.theme==='light'?'light':'dark';set(c==='dark'?'light':'dark')},true)}catch(e){}})();",
          }}
        />
        {children}
      </body>
    </html>
  );
}
