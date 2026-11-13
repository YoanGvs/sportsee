import { useUserData } from "../hooks/useUserData";
import { today } from "../utils/weeks";
import { ProfileCard } from "../components/ProfileCard";
import { BpmChart } from "../components/BpmChart";
import { KmChart } from "../components/KmChart";
import { WeekSummary } from "../components/WeekSummary";

// Date d'inscription des comptes de test : on charge tout depuis ce jour
const FIRST_DAY = "2025-01-01";

// Page Dashboard : carte profil, graphiques et résumé de la semaine
export default function Dashboard() {
  const { user, activity, loading, error } = useUserData(FIRST_DAY, today());

  if (loading) return <p className="py-16">Chargement...</p>;
  if (error || !user) return <p className="py-16 text-accent">{error}</p>;

  return (
    <main className="mx-auto max-w-[1052px] space-y-24 py-16">
      <ProfileCard user={user} />

      <section>
        <h2 className="text-[22px] font-medium">Vos dernières performances</h2>
        <div className="mt-8 grid grid-cols-[445fr_583fr] gap-6">
          {activity.length > 0 && <KmChart sessions={activity} />}
          {activity.length > 0 && <BpmChart sessions={activity} />}
        </div>
      </section>

      <section>
        <h2 className="text-[22px] font-medium">Cette semaine</h2>
        {activity.length > 0 && <WeekSummary sessions={activity} />}
      </section>
    </main>
  );
}
