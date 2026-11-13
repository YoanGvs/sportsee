import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

// Entoure les pages privées : sans token, on renvoie vers la connexion
export default function ProtectedLayout() {
  const { token } = useAuth();

  // replace évite de garder la page interdite dans l'historique
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <div className="mx-auto w-full max-w-[1140px] flex-1 px-4">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
