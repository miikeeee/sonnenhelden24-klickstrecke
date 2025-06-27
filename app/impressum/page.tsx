
"use client";
import React, { useState } from "react";

export default function Impressum() {
  const [showPopup, setShowPopup] = useState(true);
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Impressum</h1>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-2xl p-10 max-w-xl w-full border border-gray-200 animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold focus:outline-none transition-colors duration-200"
              onClick={() => setShowPopup(false)}
              aria-label="Schließen"
            >
              ×
            </button>
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#FBBF24"/><text x="12" y="17" textAnchor="middle" fontSize="16" fill="#fff" fontFamily="Arial" fontWeight="bold" alignmentBaseline="middle" dominantBaseline="middle">i</text></svg>
              </div>
              <div className="prose prose-gray max-w-none text-center">
                <h2 className="text-2xl font-bold mb-2">Impressum</h2>
                <h3 className="text-lg font-semibold mt-4 mb-1">Angaben gemäß § 5 TMG</h3>
                <p className="mb-2">SonnenHelden24.de<br />Mike Mildenberger<br />Rosenweg 21<br />53604 Bad Honnef, Deutschland</p>
                <h3 className="text-lg font-semibold mt-4 mb-1">Kontakt</h3>
                <p className="mb-2">✉️ <a href="mailto:info@sonnenhelden24.de" className="text-blue-600 hover:underline">info@sonnenhelden24.de</a></p>
                <h3 className="text-lg font-semibold mt-4 mb-1">Umsatzsteuer-Identifikationsnummer</h3>
                <p className="mb-2">Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br /><span className="font-mono">DE365504670</span></p>
                <h3 className="text-lg font-semibold mt-4 mb-1">Verantwortlich für den Inhalt</h3>
                <p className="mb-2">Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV:<br />Mike Mildenberger</p>
                <h3 className="text-lg font-semibold mt-4 mb-1">Online-Streitbeilegung</h3>
                <p className="mb-2">
                  Informationen zur Online-Streitbeilegung: Die EU-Kommission hat eine Internetplattform zur Online-Beilegung von Streitigkeiten (sog. „OS-Plattform") geschaffen. Die OS-Plattform dient als Anlaufstelle zur außergerichtlichen Beilegung von Streitigkeiten betreffend vertragliche Verpflichtungen, die aus Online-Kaufverträgen erwachsen.<br />
                  Sie können die OS-Plattform unter dem folgenden Link erreichen: <a href="http://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">http://ec.europa.eu/consumers/odr</a>
                </p>
                <h3 className="text-lg font-semibold mt-4 mb-1">Hinweis gemäß § 36 Verbraucherstreitbeilegungsgesetz (VSBG)</h3>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ...optional: restlicher Seiteninhalt... */}
    </div>
  );
}
