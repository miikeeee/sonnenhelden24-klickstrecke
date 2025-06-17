"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Clock, Battery } from "lucide-react"

interface EconomicChartProps {
  stromverbrauch: number
  jahreskosten: number
  jaehrlicheErsparnis: number
  anlagenkosten: number
  amortisationszeit: number
  gesamtersparnis20Jahre: number
}

export function EconomicChart({
  stromverbrauch,
  jahreskosten,
  jaehrlicheErsparnis,
  anlagenkosten,
  amortisationszeit,
  gesamtersparnis20Jahre,
}: EconomicChartProps) {
  const kostenOhneSolar = Array.from({ length: 20 }, (_, i) => jahreskosten * (i + 1))
  const kostenMitSolar = Array.from({ length: 20 }, (_, i) => {
    const jaehrlicheKosten = jahreskosten - jaehrlicheErsparnis
    return i === 0 ? anlagenkosten : anlagenkosten + jaehrlicheKosten * i
  })

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {/* Dynamic Key Metrics */}
      <Card className="bg-white/90">
        <CardContent className="p-4 text-center">
          <TrendingDown className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-600">
            {Math.round(jaehrlicheErsparnis).toLocaleString("de-DE")} €
          </div>
          <p className="text-sm text-gray-600">Jährliche Ersparnis</p>
        </CardContent>
      </Card>

      <Card className="bg-white/90">
        <CardContent className="p-4 text-center">
          <Clock className="h-8 w-8 text-yellow-700 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-700">{amortisationszeit} Jahre</div>
          <p className="text-sm text-gray-600">Amortisationszeit</p>
        </CardContent>
      </Card>

      <Card className="bg-white/90">
        <CardContent className="p-4 text-center">
          <Battery className="h-8 w-8 text-yellow-800 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-800">
            {Math.round(anlagenkosten).toLocaleString("de-DE")} €
          </div>
          <p className="text-sm text-gray-600">Solar + Batterie</p>
        </CardContent>
      </Card>

      <Card className="bg-white/90">
        <CardContent className="p-4 text-center">
          <TrendingUp className="h-8 w-8 text-yellow-900 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-900">
            {Math.round(gesamtersparnis20Jahre).toLocaleString("de-DE")} €
          </div>
          <p className="text-sm text-gray-600">Gewinn in 20 Jahren</p>
        </CardContent>
      </Card>

      {/* Dynamic Bar Chart Visualization */}
      <div className="md:col-span-4 bg-white/90 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Kostenvergleich über 20 Jahre - Ihr Einsparpotential mit Batteriespeicher
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Ohne Solaranlage (nur Stromkosten)</span>
              <span className="font-semibold text-red-600">
                {Math.round(jahreskosten * 20).toLocaleString("de-DE")} €
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6">
              <div className="bg-red-400 h-6 rounded-full flex items-center justify-end pr-2" style={{ width: "100%" }}>
                <span className="text-white text-xs font-semibold">100%</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Mit Solar + Batteriespeicher (Investition + Restkosten)</span>
              <span className="font-semibold text-green-600">
                {Math.round(anlagenkosten + (jahreskosten - jaehrlicheErsparnis) * 20).toLocaleString("de-DE")} €
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6">
              <div
                className="bg-yellow-500 h-6 rounded-full flex items-center justify-end pr-2"
                style={{
                  width: `${((anlagenkosten + (jahreskosten - jaehrlicheErsparnis) * 20) / (jahreskosten * 20)) * 100}%`,
                }}
              >
                <span className="text-white text-xs font-semibold">
                  {Math.round(
                    ((anlagenkosten + (jahreskosten - jaehrlicheErsparnis) * 20) / (jahreskosten * 20)) * 100,
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center space-y-2">
          <p className="text-xl font-bold text-green-600">
            Ihre Gesamtersparnis: {Math.round(gesamtersparnis20Jahre).toLocaleString("de-DE")} €
          </p>
          <p className="text-sm text-gray-600">
            Break-Even nach {amortisationszeit} Jahren - danach sparen Sie{" "}
            {Math.round(jaehrlicheErsparnis).toLocaleString("de-DE")} € pro Jahr
          </p>
          <p className="text-xs text-yellow-700 font-medium">
            🔋 Mit Batteriespeicher für maximale Energieunabhängigkeit
          </p>
        </div>
      </div>
    </div>
  )
}
