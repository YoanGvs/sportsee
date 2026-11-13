import { useUserData } from "../hooks/useUserData";
import { ProfileCard } from "../components/ProfileCard";
import { KmChart } from "../components/KmChart";

// Page Dashboard : carte profil puis graphiques (à venir)
export default function Dashboard() {
  const { user, activity, loading, error } = useUserData("2025-01-01", "2026-12-31");

  if (loading) return <p className="py-16">Chargement...</p>;
  if (error || !user) return <p className="py-16 text-accent">{error}</p>;

  return (
    <main className="mx-auto max-w-[1052px] space-y-24 py-16">
      <ProfileCard user={user} />

      <section>
        <h2 className="text-[22px] font-medium">Vos dernières performances</h2>
        <div className="mt-8 grid grid-cols-[445fr_583fr] gap-6">
          {activity.length > 0 && <KmChart sessions={activity} />}
        </div>
      </section>

      <section>
        <h2 className="text-[22px] font-medium">Cette semaine</h2>
      </section>
    </main>
  );
}
