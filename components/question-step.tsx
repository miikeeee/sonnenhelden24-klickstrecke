"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, HomeIcon, Building, AlignJustify, AlertCircle, Zap } from "lucide-react"
import type { Question } from "@/lib/questions-config"
import type { Answer } from "./solar-funnel"

const iconMap = {
  home: Home,
  "home-heart": HomeIcon,
  "align-justify": AlignJustify,
  building: Building,
  zap: Zap,
}

interface QuestionStepProps {
  question: Question
  answer?: Answer
  onAnswer: (questionId: string, value: string | number) => void
}

export function QuestionStep({ question, answer, onAnswer }: QuestionStepProps) {
  const handleSliderChange = (values: number[]) => {
    onAnswer(question.id, values[0])
  }

  const handleInputChange = (value: string) => {
    if (question.id === "plz") {
      // Only allow 5 digits for postal code
      const cleaned = value.replace(/\D/g, "").slice(0, 5)
      onAnswer(question.id, cleaned)
    } else {
      onAnswer(question.id, value)
    }
  }

  const handleStromverbrauchInputChange = (value: string) => {
    // Only allow numbers for electricity consumption
    const numericValue = value.replace(/\D/g, "")
    if (numericValue === "") {
      onAnswer(question.id, question.min || 1500)
      return
    }

    const parsedValue = Number.parseInt(numericValue)
    const minValue = question.min || 1500
    const maxValue = question.max || 12000

    // Clamp value between min and max
    const clampedValue = Math.min(Math.max(parsedValue, minValue), maxValue)
    onAnswer(question.id, clampedValue)
  }

  // Show rejection message for ownership question
  if (question.id === "eigentum" && answer?.value === "nein") {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Leider können wir Ihnen nicht weiterhelfen</h3>
        <p className="text-gray-600 leading-relaxed">
          Leider können wir Ihnen aktuell keine Fachfirma zur Installation einer Solaranlage vermitteln. Bitte sprechen
          Sie mit dem Eigentümer und bitten ihn, die Anfrage selbst zu stellen.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 text-center">{question.frage}</h2>

      {question.type === "icons" && (
        <div className={`grid gap-4 ${question.id === "zeitpunkt" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2"}`}>
          {question.options?.map((option) => {
            const isSelected = answer?.value === option.value
            const hasIcon = option.icon && iconMap[option.icon as keyof typeof iconMap]
            const IconComponent = hasIcon ? iconMap[option.icon as keyof typeof iconMap] : null

            return (
              <Button
                key={option.value}
                variant={isSelected ? "default" : "outline"}
                className={`${question.id === "zeitpunkt" ? "h-20 px-2" : "h-24"} flex flex-col gap-2 ${
                  isSelected ? "bg-[#FFFD5E] hover:bg-[#FFFD5E]/90 text-gray-800 border-[#FFFD5E]" : "hover:bg-gray-50"
                }`}
                onClick={() => onAnswer(question.id, option.value)}
              >
                {IconComponent && <IconComponent className="h-8 w-8" />}
                <span className="text-sm font-medium text-center leading-tight">{option.label}</span>
              </Button>
            )
          })}
        </div>
      )}

      {question.type === "yesno" && (
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={answer?.value === "ja" ? "default" : "outline"}
            className={`h-16 ${
              answer?.value === "ja"
                ? "bg-[#FFFD5E] hover:bg-[#FFFD5E]/90 text-gray-800 border-[#FFFD5E]"
                : "hover:bg-gray-50"
            }`}
            onClick={() => onAnswer(question.id, "ja")}
          >
            Ja
          </Button>
          <Button
            variant={answer?.value === "nein" ? "default" : "outline"}
            className={`h-16 ${
              answer?.value === "nein" ? "bg-red-500 hover:bg-red-600 text-white" : "hover:bg-gray-50"
            }`}
            onClick={() => onAnswer(question.id, "nein")}
          >
            Nein
          </Button>
        </div>
      )}

      {question.type === "slider" && (
        <div className="space-y-6">
          <div className="px-4">
            <Slider
              value={[(answer?.value as number) || question.min || 1500]}
              onValueChange={handleSliderChange}
              max={question.max || 12000}
              min={question.min || 1500}
              step={question.step || 100}
              className="w-full"
            />
          </div>

          {/* Scale markings - every 2000 steps for better readability */}
          <div className="px-4">
            <div className="flex justify-between text-xs text-gray-500 relative">
              {[1500, 3000, 5000, 7000, 9000, 12000].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <div className="w-px h-2 bg-gray-300 mb-1"></div>
                  <span>{value.toLocaleString("de-DE")}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current value display with input field */}
          <div className="text-center space-y-4">
            <div>
              <span className="text-2xl font-bold text-gray-800">{answer?.value || question.min || 1500} kWh</span>
              <p className="text-sm text-gray-600 mt-1">pro Jahr</p>
            </div>

            {/* Input field for direct entry */}
            <div className="max-w-xs mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Genauen Wert eingeben"
                  value={(answer?.value as number) || ""}
                  onChange={(e) => handleStromverbrauchInputChange(e.target.value)}
                  className="h-12 text-center text-lg pr-16"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">kWh</div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Bereich: {question.min?.toLocaleString("de-DE")} - {question.max?.toLocaleString("de-DE")} kWh
              </p>
            </div>
          </div>
        </div>
      )}

      {question.type === "select" && (
        <Select value={(answer?.value as string) || ""} onValueChange={(value) => onAnswer(question.id, value)}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Bitte wählen..." />
          </SelectTrigger>
          <SelectContent>
            {question.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {question.type === "input" && (
        <div className="space-y-2">
          <Input
            type="text"
            placeholder={question.placeholder || ""}
            value={(answer?.value as string) || ""}
            onChange={(e) => handleInputChange(e.target.value)}
            className="h-12 text-center text-lg"
            maxLength={question.id === "plz" ? 5 : undefined}
          />
          {question.id === "plz" && (
            <p className="text-sm text-gray-500 text-center">Bitte geben Sie eine 5-stellige Postleitzahl ein</p>
          )}
        </div>
      )}
    </div>
  )
}
