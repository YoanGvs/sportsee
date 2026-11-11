import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/login";
import { login } from "../services/api";
import { useAuth } from "../context/AuthContext";

// Titre de l'onglet du navigateur
export function meta({}: Route.MetaArgs) {
  return [{ title: "SportSee - Connexion" }];
}

// Page de connexion : formulaire qui envoie les identifiants au backend
export default function Login() {
  // Inputs contrôlés : React garde la valeur des champs dans le state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  // À l'envoi : on récupère le token, on le range, puis on va au dashboard
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Empêche le navigateur de recharger la page
    e.preventDefault();
    setError("");

    try {
      const data = await login(username, password);
      saveToken(data.token);
      navigate("/dashboard");
    } catch (err) {
      // Message levé par login() si les identifiants sont faux
      setError((err as Error).message);
    }
  }

  return (
    <main>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Identifiant</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Le message n'apparaît que s'il y a une erreur */}
        {error && <p>{error}</p>}

        <button type="submit">Se connecter</button>
      </form>
    </main>
  );
}
