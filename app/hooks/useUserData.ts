import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserInfo, getUserActivity } from "../services/api";
import {
  normalizeUserInfo,
  normalizeActivity,
  type UserInfo,
  type Session,
} from "../services/normalize";

// Charge le profil et les séances de l'utilisateur connecté pour une page
export function useUserData(startWeek: string, endWeek: string) {
  const { token } = useAuth();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [activity, setActivity] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Relance le chargement si le token ou la période changent
  useEffect(() => {
    if (!token) return;

    async function load(currentToken: string) {
      try {
        setLoading(true);
        // Les deux requêtes partent en parallèle
        const [rawUser, rawActivity] = await Promise.all([
          getUserInfo(currentToken),
          getUserActivity(currentToken, startWeek, endWeek),
        ]);
        setUser(normalizeUserInfo(rawUser));
        setActivity(normalizeActivity(rawActivity));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    load(token);
  }, [token, startWeek, endWeek]);

  return { user, activity, loading, error };
}
