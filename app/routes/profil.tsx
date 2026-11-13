import { useUserData } from "../hooks/useUserData";
import { today } from "../utils/weeks";
import { StatCard } from "../components/StatCard";

// Date d'inscription des comptes de test : on charge tout depuis ce jour
const FIRST_DAY = "2025-01-01";

const CARD = "rounded-2xl bg-white shadow-[0_4px_84px_-40px_#9da7fb66]";

// Taille en cm affichée comme sur la maquette : 165 → "1m65"
function formatHeight(cm: number) {
  return `${Math.floor(cm / 100)}m${String(cm % 100).padStart(2, "0")}`;
}

// Page Profil : identité à gauche, statistiques à droite
export default function Profil() {
  const { user, activity, loading, error } = useUserData(FIRST_DAY, today());

  if (loading) return <p className="py-16">Chargement...</p>;
  if (error || !user) return <p className="py-16 text-accent">{error}</p>;

  const since = user.memberSince.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  // Calories : absentes du profil, on additionne celles des séances
  const calories = activity.reduce((t, s) => t + s.calories, 0);

  // Jours de repos : jours depuis l'inscription jusqu'à la dernière séance, moins les jours courus
  const last = Math.max(...activity.map((s) => s.date.getTime()));
  const days = activity.length ? Math.round((last - user.memberSince.getTime()) / 86_400_000) + 1 : 0;
  const rest = Math.max(0, days - activity.length);

  return (
    <main className="grid grid-cols-[508fr_575fr] items-start gap-14 py-16">
      <div className="space-y-4">
        <section className={`${CARD} flex items-center gap-6 px-8 py-6`}>
          <img src={user.picture} alt={`Photo de ${user.firstName}`} className="h-[117px] w-[104px] rounded-lg object-cover" />
          <div>
            <h1 className="text-xl font-medium">{user.firstName} {user.lastName}</h1>
            <p className="mt-2 text-sm text-muted">Membre depuis le {since}</p>
          </div>
        </section>

        <section className={`${CARD} px-7 py-10`}>
          <h2 className="border-b border-[#e7e7e7] pb-6 text-[22px] font-medium">Votre profil</h2>
          <ul className="mt-8 space-y-6 text-muted">
            <li>Âge : {user.age}</li>
            {/* Genre : non fourni par l'API (limite connue) */}
            <li>Genre : Non renseigné</li>
            <li>Taille : {formatHeight(user.height)}</li>
            <li>Poids : {user.weight}kg</li>
          </ul>
        </section>
      </div>

      <section>
        <h2 className="text-[22px] font-medium">Vos statistiques</h2>
        <p className="mt-2 text-sm text-muted">depuis le {since}</p>

        <div className="mt-8 grid grid-cols-2 gap-5">
          <StatCard title="Temps total couru" value={`${user.totalHours}h`} unit={`${user.totalMinutes}min`} />
          <StatCard title="Calories brûlées" value={calories} unit="cal" />
          <StatCard title="Distance totale parcourue" value={user.totalDistance} unit="km" />
          <StatCard title="Nombre de jours de repos" value={rest} unit="jours" />
          <StatCard title="Nombre de sessions" value={user.totalSessions} unit="sessions" />
        </div>
      </section>
    </main>
  );
}
