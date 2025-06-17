"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Sun, Zap, Calculator, BarChart3 } from "lucide-react"

export function LoadingAnimation() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="py-16 px-8">
          <div className="text-center space-y-8">
            {/* Animated Solar Icon */}
            <div className="relative">
              <Sun className="h-20 w-20 text-[#FFFD53] mx-auto animate-spin" style={{ animationDuration: "3s" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#FFFD53] border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>

            {/* Loading Text */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">
                <span style={{ color: "#FFFD53" }}>Sonnen</span>Helden24 berechnet Ihr Einsparpotential
              </h2>
              <p className="text-gray-600">Bitte haben Sie einen Moment Geduld...</p>
            </div>

            {/* Loading Steps */}
            <div className="space-y-4 max-w-md mx-auto">
              <LoadingStep icon={Calculator} text="Wirtschaftlichkeit wird berechnet" delay={0} />
              <LoadingStep icon={BarChart3} text="Einsparpotential wird analysiert" delay={1000} />
              <LoadingStep icon={Zap} text="Individuelle Empfehlungen werden erstellt" delay={2000} />
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-[#FFFD53] rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: "1.5s",
                  }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface LoadingStepProps {
  icon: React.ComponentType<{ className?: string }>
  text: string
  delay: number
}

function LoadingStep({ icon: Icon, text, delay }: LoadingStepProps) {
  return (
    <div
      className="flex items-center gap-3 opacity-0 animate-fade-in"
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: "500ms",
        animationFillMode: "forwards",
      }}
    >
      <div className="w-8 h-8 bg-[#FFFD53] rounded-full flex items-center justify-center">
        <Icon className="h-4 w-4 text-gray-800" />
      </div>
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  )
}
