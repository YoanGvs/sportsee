// Adresse du backend, centralisée pour n'avoir qu'un endroit à changer
const API_URL = "http://localhost:8000/api";

// Envoie les identifiants au backend et renvoie { token, userId }
export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  // fetch ne lève pas d'erreur sur un 401, on vérifie nous-mêmes
  if (!response.ok) {
    throw new Error("Identifiants incorrects");
  }

  return response.json();
}
