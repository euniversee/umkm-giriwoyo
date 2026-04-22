import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import ScrollToTop from "@/components/scroll-to-top"

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
})

export const metadata: Metadata = {
  title: {
    default: "UMKM Giriwoyo - Platform UMKM Lokal Wonogiri",
    template: "%s | UMKM Giriwoyo",
  },
  description:
    "Platform digital untuk UMKM lokal Giriwoyo, Wonogiri. Temukan produk-produk berkualitas dari usaha mikro kecil menengah di daerah Giriwoyo dengan mudah dan praktis.",
  keywords: [
    "UMKM",
    "Giriwoyo",
    "Wonogiri",
    "usaha lokal",
    "produk lokal",
    "UMKM Indonesia",
    "ekonomi kreatif",
    "bisnis lokal",
  ],
  authors: [{ name: "UMKM Giriwoyo" }],
  creator: "UMKM Giriwoyo",
  publisher: "UMKM Giriwoyo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kawula.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "UMKM Giriwoyo - Platform UMKM Lokal Wonogiri",
    description:
      "Platform digital untuk UMKM lokal Giriwoyo, Wonogiri. Temukan produk-produk berkualitas dari usaha mikro kecil menengah.",
    url: "https://kawula.vercel.app",
    siteName: "UMKM Giriwoyo",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "UMKM Giriwoyo - Platform UMKM Lokal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UMKM Giriwoyo - Platform UMKM Lokal Wonogiri",
    description:
      "Platform digital untuk UMKM lokal Giriwoyo, Wonogiri. Temukan produk-produk berkualitas dari usaha mikro kecil menengah.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo.svg",
    shortcut: "/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  generator: "Next.js",
  applicationName: "UMKM Giriwoyo",
  referrer: "origin-when-cross-origin",
  category: "business",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${figtree.variable} font-sans selection:bg-[#161616] selection:text-white`}>
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.02]">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-50">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
        <div className="relative z-0">
          <ScrollToTop />
          {children}
        </div>
      </body>
    </html>
  )
}
