import userInfoMock from "../mocks/userInfo.json";
import userActivityMock from "../mocks/userActivity.json";

// Adresse du backend, centralisée pour n'avoir qu'un endroit à changer
const API_URL = "http://localhost:8000/api";

// true = données de démo (mocks), false = vrai backend
const USE_MOCK = true;

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

// Récupère le profil et les statistiques de l'utilisateur connecté
export async function getUserInfo(token: string) {
  if (USE_MOCK) return userInfoMock;

  const response = await fetch(`${API_URL}/user-info`, {
    // Le backend identifie l'utilisateur grâce au token
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Impossible de charger le profil");
  }
  return response.json();
}

// Récupère les séances entre deux dates (format AAAA-MM-JJ)
export async function getUserActivity(
  token: string,
  startWeek: string,
  endWeek: string
) {
  if (USE_MOCK) return userActivityMock;

  const response = await fetch(
    `${API_URL}/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!response.ok) {
    throw new Error("Impossible de charger les activités");
  }
  return response.json();
}
