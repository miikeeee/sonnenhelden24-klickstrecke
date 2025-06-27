
"use client";
import React from "react";
import Link from "next/link";
import { useLegalPopups } from "./legal-popups";

export function Footer() {
  const { openPopup, Popup } = useLegalPopups();
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <button type="button" className="hover:text-gray-800 transition-colors underline underline-offset-2" onClick={() => openPopup("impressum")}>Impressum</button>
          <button type="button" className="hover:text-gray-800 transition-colors underline underline-offset-2" onClick={() => openPopup("datenschutz")}>Datenschutz</button>
          <button type="button" className="hover:text-gray-800 transition-colors underline underline-offset-2" onClick={() => openPopup("agb")}>AGB</button>
          <Link href="/kontakt" className="hover:text-gray-800 transition-colors">Kontakt</Link>
        </div>
        <div className="text-center text-xs text-gray-500 mt-4">© 2024 Solar-Check. Alle Rechte vorbehalten.</div>
      </div>
      <Popup />
    </footer>
  );
}
