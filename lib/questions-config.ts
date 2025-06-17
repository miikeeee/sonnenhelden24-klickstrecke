export interface Question {
  id: string
  frage: string
  type: "icons" | "yesno" | "slider" | "select" | "input"
  required: boolean
  options?: Array<{
    label: string
    value: string
    icon?: string
  }>
  min?: number
  max?: number
  step?: number
  placeholder?: string
}

export const questions: Question[] = [
  {
    id: "gebaeudetyp",
    frage: "Um welche Art Gebäude handelt es sich?",
    type: "icons",
    required: true,
    options: [
      { label: "Einfamilienhaus", value: "einfamilienhaus", icon: "home" },
      { label: "Zweifamilienhaus", value: "zweifamilienhaus", icon: "home-heart" },
      { label: "Reihenhaus", value: "reihenhaus", icon: "align-justify" },
      { label: "Mehrfamilienhaus", value: "mehrfamilienhaus", icon: "building" },
    ],
  },
  {
    id: "eigentum",
    frage: "Sind Sie Eigentümer des Hauses oder liegt Ihnen eine Vollmacht des Eigentümers vor?",
    type: "yesno",
    required: true,
  },
  {
    id: "stromverbrauch",
    frage: "Wie hoch ist Ihr jährlicher Stromverbrauch (in kWh)?",
    type: "slider",
    required: true,
    min: 1500,
    max: 12000,
    step: 100,
  },
  {
    id: "zeitpunkt",
    frage: "Wann möchten Sie die Solaranlage installieren lassen?",
    type: "icons",
    required: true,
    options: [
      { label: "Sofort", value: "sofort", icon: "zap" },
      { label: "1–3 Monate", value: "1-3_monate" },
      { label: "4–6 Monate", value: "4-6_monate" },
      { label: "6+ Monate", value: "mehr_als_6_monate" },
    ],
  },
  {
    id: "plz",
    frage: "In welcher Postleitzahl befindet sich das Gebäude?",
    type: "input",
    required: true,
    placeholder: "z.B. 12345",
  },
]
