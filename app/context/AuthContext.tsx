import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// Nom du cookie qui stocke le token
const COOKIE_NAME = "token";

// Lit le token dans les cookies au démarrage de l'app
function readToken() {
  // Au build il n'y a pas de navigateur, donc pas de cookie
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

// Ce que le contexte met à disposition de toutes les pages
type AuthContextValue = {
  token: string | null;
  saveToken: (token: string) => void;
  logout: () => void;
};

// Le contexte partagé, vide tant qu'il n'est pas fourni par AuthProvider
const AuthContext = createContext<AuthContextValue | null>(null);

// Fournit le token et les fonctions de connexion/déconnexion à ses enfants
export function AuthProvider({ children }: { children: ReactNode }) {
  // On démarre avec le token déjà présent dans le cookie, s'il y en a un
  const [token, setToken] = useState(readToken);

  // Connexion : enregistre le token dans le cookie (24 h, comme le JWT) et dans le state
  function saveToken(newToken: string) {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(newToken)}; path=/; max-age=86400; SameSite=Strict`;
    setToken(newToken);
  }

  // Déconnexion : max-age=0 supprime le cookie
  function logout() {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, saveToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Raccourci pour lire le contexte depuis n'importe quel composant
export function useAuth() {
  const context = useContext(AuthContext);
  // Erreur claire si on oublie d'entourer l'app avec AuthProvider
  if (!context) {
    throw new Error("useAuth doit être utilisé dans AuthProvider");
  }
  return context;
}
