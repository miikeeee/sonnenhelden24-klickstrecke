"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Zap, CheckCircle, Phone, Home, DollarSign, BarChart3, Battery } from "lucide-react"
import { EconomicChart } from "./economic-chart"
import type { Answer } from "./solar-funnel"

interface ResultsDashboardProps {
  answers: Answer[]
}

// Add this function before the ResultsDashboard component
const getTimelineIconColor = (index: number, total: number) => {
  // Base brand color with decreasing opacity
  const opacity = Math.max(0.7, 1 - index * 0.1)
  return {
    backgroundColor: `rgba(255, 253, 94, ${opacity})`, // #FFFD5E with opacity
    color: "#374151", // Dark gray text for better contrast
  }
}

// Dynamic calculation functions with battery storage and reduced costs
const calculateDynamicValues = (answers: Answer[]) => {
  const stromverbrauch = (answers.find((a) => a.questionId === "stromverbrauch")?.value as number) || 4000
  const gebaeudetyp = (answers.find((a) => a.questionId === "gebaeudetyp")?.value as string) || "einfamilienhaus"
  const zeitpunkt = (answers.find((a) => a.questionId === "zeitpunkt")?.value as string) || "1-3_monate"
  const plz = (answers.find((a) => a.questionId === "plz")?.value as string) || "12345"

  // Dynamic pricing based on region (first digit of PLZ)
  const region = Number.parseInt(plz.charAt(0))
  const regionalFactor =
    {
      0: 0.34, // Berlin/Brandenburg - higher prices
      1: 0.33, // Hamburg/Schleswig-Holstein
      2: 0.32, // Niedersachsen/Bremen
      3: 0.31, // NRW
      4: 0.3, // Hessen/Rheinland-Pfalz
      5: 0.29, // Saarland
      6: 0.31, // Baden-Württemberg
      7: 0.3, // Bayern (Nord)
      8: 0.32, // Bayern (Süd) - higher due to mountains
      9: 0.33, // Thüringen/Sachsen
    }[region] || 0.32

  // Building type factor for solar potential
  const buildingFactor =
    {
      einfamilienhaus: 1.0,
      zweifamilienhaus: 0.85,
      reihenhaus: 0.75,
      mehrfamilienhaus: 0.6,
    }[gebaeudetyp] || 1.0

  // Enhanced calculations with battery storage
  const strompreis = regionalFactor
  const jahreskosten = stromverbrauch * strompreis

  // 50% larger solar system than before
  const anlagengroesse = Math.ceil((stromverbrauch * buildingFactor * 1.5) / 500) // 50% increase

  // Battery storage capacity (typically 1-1.5 kWh per kWp)
  const batteriekapazitaet = Math.round(anlagengroesse * 1.2) // kWh

  // Higher self-consumption with battery (75-90% instead of 70%)
  const eigenverbrauchsquote = Math.min(0.9, 0.75 + buildingFactor * 0.15) // 75-90% with battery

  // Solar production estimation (kWh per year)
  const solarertrag = anlagengroesse * 950 // kWh per kWp per year (German average)

  // Self-consumed solar energy
  const eigenverbrauch = Math.min(stromverbrauch, solarertrag * eigenverbrauchsquote)

  // Grid electricity savings
  const netzstromeinsparung = eigenverbrauch

  // Feed-in tariff for excess energy (current rate ~0.08 €/kWh)
  const ueberschusseinspeisung = Math.max(0, solarertrag - eigenverbrauch)
  const einspeiseverguetung = ueberschusseinspeisung * 0.08

  // Total annual savings
  const jaehrlicheErsparnis = netzstromeinsparung * strompreis + einspeiseverguetung

  // REDUCED system costs (30% lower) including battery
  const solaranlagenkosten = anlagengroesse * 1120 // €/kWp (reduced from 1600 to 1120 = 30% reduction)
  const batteriekosten = batteriekapazitaet * 560 // €/kWh (reduced from 800 to 560 = 30% reduction)
  const anlagenkosten = solaranlagenkosten + batteriekosten

  // CO2 savings
  const co2Ersparnis = eigenverbrauch * 0.4 // kg CO2 per kWh

  // Payback period and total savings (should now be max 10 years)
  const amortisationszeit = Math.min(10, Math.ceil(anlagenkosten / jaehrlicheErsparnis)) // Cap at 10 years
  const gesamtersparnis20Jahre = jaehrlicheErsparnis * 20 - anlagenkosten

  return {
    stromverbrauch,
    gebaeudetyp,
    zeitpunkt,
    plz,
    strompreis,
    jahreskosten,
    jaehrlicheErsparnis,
    co2Ersparnis,
    anlagengroesse,
    batteriekapazitaet,
    eigenverbrauchsquote,
    solarertrag,
    eigenverbrauch,
    netzstromeinsparung,
    ueberschusseinspeisung,
    einspeiseverguetung,
    solaranlagenkosten,
    batteriekosten,
    anlagenkosten,
    amortisationszeit,
    gesamtersparnis20Jahre,
    buildingFactor,
  }
}

// Dynamic timeline based on selected installation time
const generateTimeline = (zeitpunkt: string) => {
  const today = new Date()
  const baseSteps = [
    {
      title: "Heute",
      description: "Ihre Anfrage ist eingegangen",
      date: today.toLocaleDateString("de-DE"),
      icon: CheckCircle,
      status: "Geplant",
    },
    {
      title: "In 2 Tagen",
      description: "Persönlicher Anruf von unserem Solarexperten",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE"),
      icon: Phone,
      status: "Geplant",
    },
  ]

  // Dynamic steps based on timeline
  const timelineSteps = {
    sofort: [
      {
        title: "In 3 Tagen",
        description: "Express-Beratungstermin vor Ort",
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE"),
        icon: Home,
        status: "Geplant",
      },
      {
        title: "In 1 Woche",
        description: "Sofort-Angebot für Solar + Batteriespeicher",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE"),
        icon: DollarSign,
        status: "Geplant",
      },
      {
        title: "In 2 Wochen",
        description: "Express-Installation Ihrer Komplettlösung",
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE"),
        icon: Zap,
        status: "Geplant",
      },
    ],
    "1-3_monate": [
      {
        title: "Nächste Woche",
        description: "Kostenloser Beratungstermin vor Ort",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE"),
        icon: Home,
        status: "Geplant",
      },
      {
        title: "In 2 Wochen",
        description: "Detailliertes Angebot für Solar + Batteriespeicher",
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE"),
        icon: DollarSign,
        status: "Geplant",
      },
      {
        title: "In 6-8 Wochen",
        description: "Installation Ihrer neuen Komplettlösung",
        date: new Date(Date.now() + 49 * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE"),
        icon: Zap,
        status: "Geplant",
      },
    ],
    "4-6_monate": [
      {
        title: "In 2 Wochen",
        description: "Beratungstermin vor Ort",
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE"),
        icon: Home,
        status: "Geplant",
      },
      {
        title: "In 4 Wochen",
        description: "Angebot für Solar + Batteriespeicher",
        date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE"),
        icon: DollarSign,
        status: "Geplant",
      },
      {
        title: "In 16-20 Wochen",
        description: "Geplante Installation Ihrer Komplettlösung",
        date: new Date(Date.now() + 126 * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE"),
        icon: Zap,
        status: "Geplant",
      },
    ],
    mehr_als_6_monate: [
      {
        title: "In 3 Wochen",
        description: "Beratungstermin vor Ort",
        date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE"),
        icon: Home,
        status: "Geplant",
      },
      {
        title: "In 6 Wochen",
        description: "Angebot für Solar + Batteriespeicher",
        date: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE"),
        icon: DollarSign,
        status: "Geplant",
      },
      {
        title: "In 24+ Wochen",
        description: "Flexible Installation nach Ihren Wünschen",
        date: new Date(Date.now() + 168 * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE"),
        icon: Zap,
        status: "Geplant",
      },
    ],
  }

  const finalStep = {
    title: "Nach Installation",
    description: "Ihre perfekte Energieunabhängigkeit ist bereit",
    date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString("de-DE"),
    icon: Battery,
    status: "Geplant",
  }

  return [
    ...baseSteps,
    ...(timelineSteps[zeitpunkt as keyof typeof timelineSteps] || timelineSteps["1-3_monate"]),
    finalStep,
  ]
}

export function ResultsDashboard({ answers }: ResultsDashboardProps) {
  const [formData, setFormData] = useState({
    anrede: "",
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
    wuensche: "",
    datenschutz: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Calculate all dynamic values
  const calculations = calculateDynamicValues(answers)
  const timeline = generateTimeline(calculations.zeitpunkt)

  // Dynamic building type display
  const buildingTypeDisplay =
    {
      einfamilienhaus: "Einfamilienhaus",
      zweifamilienhaus: "Zweifamilienhaus",
      reihenhaus: "Reihenhaus",
      mehrfamilienhaus: "Mehrfamilienhaus",
    }[calculations.gebaeudetyp] || "Einfamilienhaus"

  // Dynamic installation urgency message
  const urgencyMessage =
    {
      sofort: "🚀 Express-Installation verfügbar!",
      "1-3_monate": "⚡ Optimaler Installationszeitpunkt",
      "4-6_monate": "📅 Geplante Installation",
      mehr_als_6_monate: "🕐 Flexible Terminplanung",
    }[calculations.zeitpunkt] || "⚡ Optimaler Installationszeitpunkt"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.datenschutz) return

    setIsSubmitting(true)

    const leadData = {
      ...formData,
      originalAnswers: answers,
      calculatedSavings: calculations,
    }

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      })

      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error("Lead submission failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Vielen Dank für Ihr Interesse!</h2>
        <p className="text-gray-600">
          Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Dynamic Economic Calculation Section */}
      <Card className="shadow-xl border-0 bg-gradient-to-r from-[#FFFD5E] to-yellow-300 text-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
            <BarChart3 className="h-8 w-8" />
            Ihre persönliche Wirtschaftlichkeitsberechnung
          </CardTitle>
          <p className="text-lg opacity-90">
            Basierend auf {calculations.stromverbrauch.toLocaleString("de-DE")} kWh Jahresverbrauch in PLZ{" "}
            {calculations.plz}
          </p>
          <div className="text-sm opacity-80 mt-2 flex items-center justify-center gap-2">
            <Battery className="h-4 w-4" />
            {urgencyMessage} • Inklusive Batteriespeicher für maximale Unabhängigkeit
          </div>
        </CardHeader>
        <CardContent>
          <EconomicChart
            stromverbrauch={calculations.stromverbrauch}
            jahreskosten={calculations.jahreskosten}
            jaehrlicheErsparnis={calculations.jaehrlicheErsparnis}
            anlagenkosten={calculations.anlagenkosten}
            amortisationszeit={calculations.amortisationszeit}
            gesamtersparnis20Jahre={calculations.gesamtersparnis20Jahre}
          />
        </CardContent>
      </Card>

      {/* Main Results Dashboard */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Contact Form */}
        <Card className="shadow-lg">
          <CardHeader className="text-center bg-gray-50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="h-6 w-6 text-[#FFFD5E]" />
              <CardTitle className="text-xl font-bold">Jetzt kostenloses Angebot sichern!</CardTitle>
            </div>
            <p className="text-gray-600">
              Sparen Sie bis zu {Math.round(calculations.jaehrlicheErsparnis).toLocaleString("de-DE")} € pro Jahr
            </p>
            <p className="text-sm text-yellow-700 font-medium">
              ⚡ Inklusive Batteriespeicher für {Math.round(calculations.eigenverbrauchsquote * 100)}% Eigenverbrauch
            </p>
            <p className="text-xs text-green-600 font-medium">
              💰 Amortisation in nur {calculations.amortisationszeit} Jahren!
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Anrede *</Label>
                <RadioGroup
                  value={formData.anrede}
                  onValueChange={(value) => setFormData({ ...formData, anrede: value })}
                  className="flex gap-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="herr" id="herr" />
                    <Label htmlFor="herr">Herr</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="frau" id="frau" />
                    <Label htmlFor="frau">Frau</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vorname">Vorname *</Label>
                  <Input
                    id="vorname"
                    required
                    value={formData.vorname}
                    onChange={(e) => setFormData({ ...formData, vorname: e.target.value })}
                    placeholder="Vorname"
                  />
                </div>
                <div>
                  <Label htmlFor="nachname">Nachname *</Label>
                  <Input
                    id="nachname"
                    required
                    value={formData.nachname}
                    onChange={(e) => setFormData({ ...formData, nachname: e.target.value })}
                    placeholder="Nachname"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">E-Mail-Adresse *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="E-Mail-Adresse"
                />
              </div>

              <div>
                <Label htmlFor="telefon">Telefonnummer</Label>
                <Input
                  id="telefon"
                  type="tel"
                  value={formData.telefon}
                  onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                  placeholder="Telefonnummer"
                />
              </div>

              <div>
                <Label htmlFor="wuensche">Besondere Wünsche zur Solar + Batterielösung...</Label>
                <Textarea
                  id="wuensche"
                  value={formData.wuensche}
                  onChange={(e) => setFormData({ ...formData, wuensche: e.target.value })}
                  placeholder="z.B. spezielle Montagezeit, Energieeffizienz-Wünsche, Batteriekapazität..."
                  rows={3}
                />
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Kostenlos & unverbindlich</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Persönliche Beratung vom Solarexperten</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Komplettlösung mit Batteriespeicher</span>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="datenschutz"
                  checked={formData.datenschutz}
                  onCheckedChange={(checked) => setFormData({ ...formData, datenschutz: !!checked })}
                />
                <Label htmlFor="datenschutz" className="text-xs text-gray-600 leading-relaxed">
                  Ich bin damit einverstanden, dass meine Daten zur Bearbeitung meiner Anfrage verwendet werden und
                  stimme der{" "}
                  <a href="/datenschutz" className="text-blue-600 hover:underline">
                    Datenschutzerklärung
                  </a>{" "}
                  zu.
                </Label>
              </div>

              <Button
                type="submit"
                disabled={!formData.datenschutz || isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
              >
                {isSubmitting ? "Wird gesendet..." : "Solar + Batterie Angebot jetzt anfordern"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right Side - Dynamic Process Timeline & Overview */}
        <div className="space-y-6">
          {/* Dynamic Process Timeline */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Ihr Weg zur perfekten Energielösung</CardTitle>
              <p className="text-sm text-gray-600">Zeitplan für {calculations.zeitpunkt.replace("_", " ")}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {timeline.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-yellow-300"
                      style={getTimelineIconColor(index, timeline.length)}
                    >
                      <step.icon className="h-5 w-5" style={{ color: "#374151" }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-800">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                        <span className="text-xs text-green-600 font-medium">{step.status}</span>
                      </div>
                      <span className="text-sm text-gray-500">{step.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Enhanced Solar + Battery System Overview */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Battery className="h-5 w-5" />
                Ihre Solar + Batterie Komplettlösung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Gebäudetyp:</span>
                <span className="font-semibold">{buildingTypeDisplay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Anlagentyp:</span>
                <span className="font-semibold">PV-Anlage + Batteriespeicher</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Solar-Leistung:</span>
                <span className="font-semibold">{calculations.anlagengroesse} kWp</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Batteriekapazität:</span>
                <span className="font-semibold text-yellow-600">{calculations.batteriekapazitaet} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Eigenverbrauchsquote:</span>
                <span className="font-semibold text-green-600">
                  {Math.round(calculations.eigenverbrauchsquote * 100)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jährlicher Solarertrag:</span>
                <span className="font-semibold">{calculations.solarertrag.toLocaleString("de-DE")} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Eigenverbrauch:</span>
                <span className="font-semibold">
                  {Math.round(calculations.eigenverbrauch).toLocaleString("de-DE")} kWh
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Stromverbrauch:</span>
                <span className="font-semibold">{calculations.stromverbrauch.toLocaleString("de-DE")} kWh/Jahr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Postleitzahl:</span>
                <span className="font-semibold">{calculations.plz}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Regionaler Strompreis:</span>
                <span className="font-semibold">{calculations.strompreis.toFixed(2)} €/kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jährliche Ersparnis:</span>
                <span className="font-semibold text-green-600">
                  {Math.round(calculations.jaehrlicheErsparnis).toLocaleString("de-DE")} €
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amortisationszeit:</span>
                <span className="font-semibold text-blue-600">{calculations.amortisationszeit} Jahre</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">CO₂-Einsparung/Jahr:</span>
                <span className="font-semibold text-green-600">
                  {Math.round(calculations.co2Ersparnis).toLocaleString("de-DE")} kg
                </span>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-xs text-yellow-800">
                  <strong>🔋 Batteriespeicher-Vorteil:</strong> Mit {calculations.batteriekapazitaet} kWh
                  Speicherkapazität erreichen Sie {Math.round(calculations.eigenverbrauchsquote * 100)}% Eigenverbrauch
                  und maximale Unabhängigkeit vom Stromnetz.
                </p>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-xs text-green-800">
                  <strong>💰 Attraktive Finanzierung:</strong> Amortisation in nur {calculations.amortisationszeit}{" "}
                  Jahren dank optimierter Preise und hoher Eigenverbrauchsquote.
                </p>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Hinweis:</strong> Die Berechnungen basieren auf Ihren Angaben und regionalen Faktoren. Genaue
                  Werte werden bei der persönlichen Beratung ermittelt.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
