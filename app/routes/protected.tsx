import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

// Entoure les pages privées : sans token, on renvoie vers la connexion
export default function ProtectedLayout() {
  const { token, logout } = useAuth();

  // replace évite de garder la page interdite dans l'historique
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {/* En-tête provisoire, à refaire avec la maquette Figma */}
      <header>
        {/* Vider le token suffit : ce composant se relance et redirige */}
        <button type="button" onClick={logout}>
          Déconnexion
        </button>
      </header>
      <Outlet />
    </>
  );
}
