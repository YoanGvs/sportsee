// Ramène une date au lundi de sa semaine, à minuit
export function startOfWeek(date: Date) {
  const d = new Date(date);
  // getDay() : dimanche = 0 ; on décale pour que lundi = 0
  const day = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Ajoute (ou retire si négatif) un nombre de jours à une date
export function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// Format court pour les périodes, ex. "28 mai"
export function shortDate(date: Date) {
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

// Date du jour au format attendu par le backend, ex. "2026-11-13"
export function today() {
  return new Date().toISOString().slice(0, 10);
}
