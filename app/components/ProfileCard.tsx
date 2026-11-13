import type { UserInfo } from "../services/normalize";

// Carte d'identité de l'utilisateur : photo, nom, ancienneté, distance totale
export function ProfileCard({ user }: { user: UserInfo }) {
  // Date lisible en français, ex. "1 janvier 2025"
  const since = user.memberSince.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="flex items-center justify-between rounded-2xl bg-white px-12 py-8 shadow-[0_4px_84px_-40px_#9da7fb66]">
      <div className="flex items-center gap-9">
        <img
          src={user.picture}
          alt={`Photo de ${user.firstName}`}
          className="h-[117px] w-[104px] rounded-lg object-cover"
        />
        <div>
          <h2 className="text-xl font-medium">
            {user.firstName} {user.lastName}
          </h2>
          <p className="mt-2 text-sm text-muted">Membre depuis le {since}</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <span className="text-sm text-muted">Distance totale parcourue</span>
        <span className="rounded-lg bg-brand px-10 py-6 text-2xl font-semibold text-white">
          {user.totalDistance} km
        </span>
      </div>
    </section>
  );
}
