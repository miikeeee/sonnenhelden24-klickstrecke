import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Solar-Check | Ihr Einsparpotential mit Solaranlagen",
  description:
    "Ermitteln Sie in wenigen Schritten Ihr individuelles Einsparpotential mit einer Solaranlage. Kostenlos und unverbindlich.",
  keywords: "Solaranlage, Photovoltaik, Stromkosten sparen, Eigenverbrauch, Solar-Check",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
