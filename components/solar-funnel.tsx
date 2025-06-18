"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Sun } from "lucide-react"
import { QuestionStep } from "./question-step"
import { ResultsDashboard } from "./results-dashboard"
import { ContactForm } from "./contact-form"
import { LoadingAnimation } from "./loading-animation"
import { questions } from "@/lib/questions-config"

export interface Answer {
  questionId: string
  value: string | number
}

export function SolarFunnel() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const progress = ((currentStep + 1) / questions.length) * 100

  const handleAnswer = (questionId: string, value: string | number) => {
    const newAnswers = answers.filter((a) => a.questionId !== questionId)
    newAnswers.push({ questionId, value })
    setAnswers(newAnswers)

    // Check for ownership question - if "no", show rejection
    if (questionId === "eigentum" && value === "nein") {
      return // Stay on current step to show rejection message
    }
  }

  const handleNext = () => {
    const currentQuestion = questions[currentStep]
    const currentAnswer = answers.find((a) => a.questionId === currentQuestion.id)

    if (!currentAnswer && currentQuestion.required) {
      return // Don't proceed if required answer is missing
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setShowLoading(true)

    const payload = {
      id: "solaranlage",
      timestamp: new Date().toISOString(),
      answers: answers.reduce(
        (acc, answer) => {
          acc[answer.questionId] = answer.value
          return acc
        },
        {} as Record<string, string | number>,
      ),
    }

    // Start both the webhook call and minimum 3-second timer
    const webhookPromise = fetch("/api/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 3000))

    try {
      // Wait for both webhook response and minimum time
      const [webhookResponse] = await Promise.all([webhookPromise, minTimePromise])

      if (webhookResponse.ok) {
        setShowLoading(false)
        setShowResults(true)
      } else {
        throw new Error("Webhook failed")
      }
    } catch (error) {
      console.error("Submission failed:", error)
      // Even on error, wait for minimum time before showing fallback
      await minTimePromise
      setShowLoading(false)
      setShowContactForm(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showLoading) {
    return <LoadingAnimation />
  }

  if (showContactForm) {
    return <ContactForm answers={answers} />
  }

  if (showResults) {
    return <ResultsDashboard answers={answers} />
  }

  const currentQuestion = questions[currentStep]
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion.id)
  const canProceed = !currentQuestion.required || currentAnswer

  // Hide "Weiter" button if step 2 and "nein" is selected
  const showNextButton = !(currentQuestion.id === "eigentum" && currentAnswer?.value === "nein")

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sun className="h-8 w-8 text-black" />
            <CardTitle className="text-2xl font-bold text-gray-800">
              <span style={{ background: "#FFFD53", color: "#222", borderRadius: 4, padding: "0 6px" }}>Sonnen</span>Helden24 Solar Check
            </CardTitle>
          </div>
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm text-gray-600 mt-2">
            Schritt {currentStep + 1} von {questions.length}
          </p>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <QuestionStep question={currentQuestion} answer={currentAnswer} onAnswer={handleAnswer} />

          <div className="flex justify-between mt-8 gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Zurück
            </Button>

            {showNextButton && (
              <Button
                onClick={handleNext}
                disabled={!canProceed || isSubmitting}
                className="flex items-center gap-2 bg-[#FFFD5E] hover:bg-[#FFFD5E]/90 text-gray-800 font-semibold"
              >
                {currentStep === questions.length - 1 ? (
                  isSubmitting ? (
                    "Ergebnis wird berechnet..."
                  ) : (
                    "Ergebnis anzeigen"
                  )
                ) : (
                  <>
                    Weiter
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
