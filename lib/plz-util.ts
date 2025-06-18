// Utility to load PLZ list from public/data/plz.json
export async function fetchPlzList(): Promise<string[]> {
  const res = await fetch('/data/plz.json')
  if (!res.ok) throw new Error('PLZ-Liste konnte nicht geladen werden')
  return res.json()
}
