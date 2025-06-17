"use client"
import { SolarFunnel } from "@/components/solar-funnel"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <SolarFunnel />
      </main>
      <Footer />
    </div>
  )
}
