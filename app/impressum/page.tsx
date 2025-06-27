import React, { useState } from "react";

export default function Impressum() {
  const [showPopup, setShowPopup] = useState(true);
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Impressum</h1>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold focus:outline-none"
              onClick={() => setShowPopup(false)}
              aria-label="Schließen"
            >
              ×
            </button>
            <div className="prose prose-gray max-w-none">
              <h2>Impressum</h2>
              <h3>Angaben gemäß § 5 TMG</h3>
              <p>SonnenHelden24.de<br />Mike Mildenberger<br />Rosenweg 21<br />53604 Bad Honnef, Deutschland</p>
              <h3>Kontakt</h3>
              <p>✉️ info@sonnenhelden24.de</p>
              <h3>Umsatzsteuer-Identifikationsnummer</h3>
              <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />DE365504670</p>
              <h3>Verantwortlich für den Inhalt</h3>
              <p>Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV:<br />Mike Mildenberger</p>
              <h3>Online-Streitbeilegung</h3>
              <p>
                Informationen zur Online-Streitbeilegung: Die EU-Kommission hat eine Internetplattform zur Online-Beilegung von Streitigkeiten (sog. „OS-Plattform") geschaffen. Die OS-Plattform dient als Anlaufstelle zur außergerichtlichen Beilegung von Streitigkeiten betreffend vertragliche Verpflichtungen, die aus Online-Kaufverträgen erwachsen.<br />
                Sie können die OS-Plattform unter dem folgenden Link erreichen: <a href="http://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">http://ec.europa.eu/consumers/odr</a>
              </p>
              <h3>Hinweis gemäß § 36 Verbraucherstreitbeilegungsgesetz (VSBG)</h3>
            </div>
          </div>
        </div>
      )}
      {/* ...optional: restlicher Seiteninhalt... */}
    </div>
  );
}
