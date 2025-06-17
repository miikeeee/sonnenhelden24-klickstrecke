import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <Link href="/impressum" className="hover:text-gray-800 transition-colors">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-gray-800 transition-colors">
            Datenschutz
          </Link>
          <Link href="/agb" className="hover:text-gray-800 transition-colors">
            AGB
          </Link>
          <Link href="/kontakt" className="hover:text-gray-800 transition-colors">
            Kontakt
          </Link>
        </div>
        <div className="text-center text-xs text-gray-500 mt-4">© 2024 Solar-Check. Alle Rechte vorbehalten.</div>
      </div>
    </footer>
  )
}
