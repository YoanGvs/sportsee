// Pied de page commun aux pages privées
export function Footer() {
  return (
    <footer className="mt-16 flex justify-between bg-white px-24 py-3 text-sm">
      <p>
        ©Sportsee <span className="ml-2">Tous droits réservés</span>
      </p>
      <nav className="flex gap-4">
        <a href="#">Conditions générales</a>
        <a href="#">Contact</a>
      </nav>
    </footer>
  );
}
