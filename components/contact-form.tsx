"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Mail } from "lucide-react"
import type { Answer } from "./solar-funnel"

interface ContactFormProps {
  answers: Answer[]
}

export function ContactForm({ answers }: ContactFormProps) {
  const [formData, setFormData] = useState({
    vorname: "",
    nachname: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1000)
  }

  const handleCTA = () => {
    window.open("https://app.neko24.de", "_blank")
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="text-center py-12">
            <Mail className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Vielen Dank!</h2>
            <p className="text-gray-600 mb-6">
              Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.
            </p>
            <Button onClick={handleCTA} className="bg-[#FFFD5E] hover:bg-[#FFFD5E]/90 text-gray-800 font-semibold">
              Zur Beratung
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold text-gray-800">Technisches Problem</CardTitle>
          <p className="text-gray-600">
            Es gab ein Problem bei der Übertragung. Bitte hinterlassen Sie uns Ihre Kontaktdaten.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vorname">Vorname *</Label>
                <Input
                  id="vorname"
                  required
                  value={formData.vorname}
                  onChange={(e) => setFormData({ ...formData, vorname: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nachname">Nachname *</Label>
                <Input
                  id="nachname"
                  required
                  value={formData.nachname}
                  onChange={(e) => setFormData({ ...formData, nachname: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-Mail-Adresse *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FFFD5E] hover:bg-[#FFFD5E]/90 text-gray-800 font-semibold"
            >
              {isSubmitting ? "Wird gesendet..." : "Jetzt unverbindlich beraten lassen"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
