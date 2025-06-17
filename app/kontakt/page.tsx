export default function Kontakt() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Kontakt</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Kontaktinformationen</h2>
          <div className="space-y-2">
            <p>
              <strong>Adresse:</strong>
              <br />
              [Ihre Adresse]
              <br />
              [PLZ Ort]
            </p>

            <p>
              <strong>Telefon:</strong>
              <br />
              [Ihre Telefonnummer]
            </p>

            <p>
              <strong>E-Mail:</strong>
              <br />
              [Ihre E-Mail-Adresse]
            </p>

            <p>
              <strong>Öffnungszeiten:</strong>
              <br />
              Mo-Fr: 9:00 - 18:00 Uhr
              <br />
              Sa: 10:00 - 14:00 Uhr
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Schnellkontakt</h2>
          <p className="text-gray-600 mb-4">
            Für eine schnelle und unverbindliche Beratung besuchen Sie unsere Beratungsplattform:
          </p>
          <a
            href="https://app.neko24.de"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#FFFD5E] hover:bg-[#FFFD5E]/90 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Zur Beratung
          </a>
        </div>
      </div>
    </div>
  )
}
