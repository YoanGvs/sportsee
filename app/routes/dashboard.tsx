import { useUserData } from "../hooks/useUserData";

// Affichage provisoire pour vérifier que les données arrivent bien
export default function Dashboard() {
  const { user, activity, loading, error } = useUserData("2025-01-01", "2026-12-31");

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <h1>Bonjour {user?.firstName}</h1>
      <p>
        {user?.totalDistance} km parcourus, {user?.totalHours} h {user?.totalMinutes} min
      </p>
      <p>{activity.length} séances chargées</p>
    </main>
  );
}
