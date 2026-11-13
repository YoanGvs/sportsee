import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Logo } from "./Logo";

// Style d'un lien du menu, plus marqué quand c'est la page courante
function linkClass({ isActive }: { isActive: boolean }) {
  return isActive ? "font-semibold text-brand" : "hover:text-brand";
}

// En-tête des pages privées : logo + menu de navigation
export function Header() {
  const { logout } = useAuth();

  return (
    <header className="flex items-center justify-between py-8">
      <Logo />
      <nav className="flex items-center gap-8 rounded-full bg-white px-10 py-4 text-sm">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/profil" className={linkClass}>
          Mon profil
        </NavLink>
        <span className="text-brand" aria-hidden="true">
          |
        </span>
        {/* Vider le token suffit : le layout protégé redirige vers la connexion */}
        <button type="button" onClick={logout} className="text-brand hover:underline">
          Se déconnecter
        </button>
      </nav>
    </header>
  );
}
