"use client";
import React, { useState } from "react";

export function useLegalPopups() {
  const [open, setOpen] = useState<null | "impressum" | "datenschutz" | "agb">(null);
  const openPopup = (type: "impressum" | "datenschutz" | "agb") => setOpen(type);
  const closePopup = () => setOpen(null);

  const Popup = () => {
    if (!open) return null;
    let content;
    if (open === "impressum") {
      content = (
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
      );
    } else if (open === "datenschutz") {
      content = (
        <div className="prose prose-gray max-w-none text-center">
          <h2 className="text-2xl font-bold mb-2">Datenschutzerklärung</h2>
          <h3>1. Datenschutz auf einen Blick</h3>
          <h4>Allgemeine Hinweise</h4>
          <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
          <h3>2. Allgemeine Hinweise und Pflichtinformationen</h3>
          <h4>Datenschutz</h4>
          <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
          <h3>3. Datenerfassung auf dieser Website</h3>
          <h4>Kontaktformular</h4>
          <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.</p>
        </div>
      );
    } else if (open === "agb") {
      content = (
        <div className="prose prose-gray max-w-none text-center">
          <h2 className="text-2xl font-bold mb-2">Allgemeine Geschäftsbedingungen</h2>
          <h3>§ 1 Geltungsbereich</h3>
          <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen [Ihr Firmenname] und dem Kunden.</p>
          <h3>§ 2 Vertragsschluss</h3>
          <p>Die Darstellung der Produkte und Leistungen auf unserer Website stellt kein rechtlich bindendes Angebot dar, sondern einen unverbindlichen Online-Katalog.</p>
          <h3>§ 3 Preise und Zahlungsbedingungen</h3>
          <p>Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer und sonstiger Preisbestandteile.</p>
        </div>
      );
    }
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
        <div className="relative bg-white rounded-2xl shadow-2xl p-10 max-w-xl w-full border border-gray-200 animate-fade-in">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold focus:outline-none transition-colors duration-200"
            onClick={closePopup}
            aria-label="Schließen"
          >
            ×
          </button>
          {content}
        </div>
      </div>
    );
  };

  return { open, openPopup, closePopup, Popup };
}
