import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Daniel Ian Kurniawan - iOS Developer & Product Manager",
  description:
    "iOS Developer and Product Manager with 1+ years of experience in mobile development, artificial intelligence, and user-centered design.",
  keywords: "iOS Developer, Product Manager, Swift, SwiftUI, Mobile Development, AI, Artificial Intelligence",
  authors: [{ name: "Daniel Ian Kurniawan" }],
  creator: "Daniel Ian Kurniawan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://danieliank.vercel.app",
    title: "Daniel Ian Kurniawan - iOS Developer & Product Manager",
    description:
      "iOS Developer and Product Manager with 1+ years of experience in mobile development, artificial intelligence, and user-centered design.",
    siteName: "Daniel Ian Kurniawan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Ian Kurniawan - iOS Developer & Product Manager",
    description:
      "iOS Developer and Product Manager with 1+ years of experience in mobile development, artificial intelligence, and user-centered design.",
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
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
