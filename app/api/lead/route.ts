import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Log the received lead data for debugging
    console.log("Received detailed lead data:", data)

    // Your Make.com webhook URL for detailed leads
    const webhookUrl = "https://hook.eu2.make.com/u4ww60ufqp6hreumavbx248ej1njkn9s"

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "detailed_lead",
        ...data,
      }),
    })

    if (!response.ok) {
      throw new Error(`Webhook failed with status: ${response.status}`)
    }

    console.log("Successfully sent detailed lead data to Make.com webhook")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Lead webhook error:", error)
    return NextResponse.json({ error: "Failed to process lead" }, { status: 500 })
  }
}
