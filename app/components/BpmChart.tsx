import { useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Session } from "../services/normalize";
import { addDays, shortDate, startOfWeek } from "../utils/weeks";
import { PeriodNav } from "./PeriodNav";

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

// Noms affichés dans la légende et l'infobulle
const NAMES: Record<string, string> = { min: "Min", max: "Max BPM", avg: "BPM moyen" };

// Ramène une date à minuit pour comparer des jours entre eux
function dayKey(date: Date) {
  return new Date(date).setHours(0, 0, 0, 0);
}

// Graphique de la fréquence cardiaque, jour par jour, semaine par semaine
export function BpmChart({ sessions }: { sessions: Session[] }) {
  // Nombre de semaines dont on recule avec la flèche
  const [offset, setOffset] = useState(0);

  // Dernière semaine qui contient une séance, décalée selon la flèche
  const latest = startOfWeek(new Date(Math.max(...sessions.map((s) => s.date.getTime()))));
  const monday = addDays(latest, -7 * offset);

  // Les 7 jours : null quand il n'y a pas de séance, donc pas de barre
  const data = DAYS.map((label, i) => {
    const day = addDays(monday, i);
    const s = sessions.find((s) => dayKey(s.date) === day.getTime());
    return { label, min: s?.heartMin ?? null, max: s?.heartMax ?? null, avg: s?.heartAvg ?? null };
  });

  // Moyenne des BPM des séances de la semaine (0 si semaine vide)
  const avgs = data.flatMap((d) => (d.avg === null ? [] : [d.avg]));
  const average = avgs.length ? Math.round(avgs.reduce((t, a) => t + a, 0) / avgs.length) : 0;
  const period = `${shortDate(monday)} - ${shortDate(addDays(monday, 6))}`;

  return (
    <article className="rounded-2xl bg-white p-8 shadow-[0_4px_84px_-40px_#9da7fb66]">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[22px] font-medium text-accent">{average} BPM</h3>
          <p className="mt-2 text-xs text-muted">Fréquence cardiaque moyenne</p>
        </div>
        <PeriodNav
          label={period}
          onPrev={() => setOffset(offset + 1)}
          onNext={() => setOffset(offset - 1)}
          nextDisabled={offset === 0}
        />
      </div>

      <div className="mt-8 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid vertical={false} stroke="#f1f1f1" />
            <XAxis dataKey="label" tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} domain={[100, "auto"]} />
            <Tooltip formatter={(value, name) => [`${value} bpm`, NAMES[String(name)]]} cursor={{ fill: "#f2f3ff" }} />
            <Legend iconType="circle" iconSize={8} align="left" formatter={(name) => NAMES[String(name)]} />
            <Bar dataKey="min" fill="#fcc1b6" barSize={14} radius={[10, 10, 10, 10]} />
            <Bar dataKey="max" fill="#f4320b" barSize={14} radius={[10, 10, 10, 10]} />
            {/* connectNulls : la courbe relie les jours avec séance en sautant les jours vides */}
            <Line dataKey="avg" stroke="#0b23f4" strokeWidth={2} dot={{ r: 4, fill: "#0b23f4" }} connectNulls />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
