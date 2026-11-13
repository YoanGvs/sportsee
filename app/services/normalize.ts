// Forme brute du profil, telle que le backend la renvoie
type RawUserInfo = {
  profile: {
    firstName: string;
    lastName: string;
    createdAt: string;
    age: number;
    weight: number;
    height: number;
    profilePicture: string;
  };
  statistics: {
    totalDistance: string;
    totalSessions: number;
    totalDuration: number;
  };
};

// Forme brute d'une séance
type RawSession = {
  date: string;
  distance: number;
  duration: number;
  heartRate: { min: number; max: number; average: number };
  caloriesBurned: number;
};

// Transforme le profil brut en données prêtes à afficher
export function normalizeUserInfo(raw: RawUserInfo) {
  const minutes = raw.statistics.totalDuration;

  return {
    firstName: raw.profile.firstName,
    lastName: raw.profile.lastName,
    memberSince: new Date(raw.profile.createdAt),
    age: raw.profile.age,
    weight: raw.profile.weight,
    height: raw.profile.height,
    picture: raw.profile.profilePicture,
    // Le backend envoie la distance en texte ("2250.2")
    totalDistance: Math.round(Number(raw.statistics.totalDistance)),
    totalSessions: raw.statistics.totalSessions,
    // Durée totale en minutes découpée en heures + minutes restantes
    totalHours: Math.floor(minutes / 60),
    totalMinutes: minutes % 60,
  };
}

// Transforme chaque séance : date convertie et fréquence cardiaque aplatie
export function normalizeActivity(raw: RawSession[]) {
  return raw.map((session) => ({
    date: new Date(session.date),
    distance: session.distance,
    duration: session.duration,
    heartMin: session.heartRate.min,
    heartMax: session.heartRate.max,
    heartAvg: session.heartRate.average,
    calories: session.caloriesBurned,
  }));
}

// Types des données propres, utilisés par le hook et les composants
export type UserInfo = ReturnType<typeof normalizeUserInfo>;
export type Session = ReturnType<typeof normalizeActivity>[number];
