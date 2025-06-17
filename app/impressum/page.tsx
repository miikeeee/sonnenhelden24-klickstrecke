export default function Impressum() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Impressum</h1>

      <div className="prose prose-gray max-w-none">
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          [Ihr Firmenname]
          <br />
          [Ihre Adresse]
          <br />
          [PLZ Ort]
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: [Ihre Telefonnummer]
          <br />
          E-Mail: [Ihre E-Mail-Adresse]
        </p>

        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          [Name des Verantwortlichen]
          <br />
          [Adresse]
        </p>
      </div>
    </div>
  )
}
