import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Session } from "../services/normalize";
import { addDays, shortDate, startOfWeek } from "../utils/weeks";
import { PeriodNav } from "./PeriodNav";

// Graphique des km parcourus par semaine, par période de 4 semaines
export function KmChart({ sessions }: { sessions: Session[] }) {
  // Nombre de périodes de 4 semaines dont on recule avec la flèche
  const [offset, setOffset] = useState(0);

  // Dernière semaine qui contient une séance, décalée selon la flèche
  const latest = startOfWeek(new Date(Math.max(...sessions.map((s) => s.date.getTime()))));
  const lastWeek = addDays(latest, -28 * offset);

  // Les 4 lundis de la période, du plus ancien au plus récent
  const weeks = [3, 2, 1, 0].map((i) => addDays(lastWeek, -7 * i));

  // Pour chaque semaine : somme des distances de ses séances
  const data = weeks.map((monday, i) => {
    const km = sessions
      .filter((s) => s.date >= monday && s.date < addDays(monday, 7))
      .reduce((total, s) => total + s.distance, 0);
    return { label: `S${i + 1}`, km: Math.round(km * 10) / 10 };
  });

  const average = Math.round(data.reduce((total, w) => total + w.km, 0) / 4);
  const period = `${shortDate(weeks[0])} - ${shortDate(addDays(lastWeek, 6))}`;

  return (
    <article className="rounded-2xl bg-white p-8 shadow-[0_4px_84px_-40px_#9da7fb66]">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[22px] font-medium text-brand">{average}km en moyenne</h3>
          <p className="mt-2 text-xs text-muted">Total des kilomètres 4 dernières semaines</p>
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
          <BarChart data={data}>
            <CartesianGrid vertical={false} stroke="#f1f1f1" />
            <XAxis dataKey="label" tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
            <Tooltip formatter={(value) => [`${value} km`, "Distance"]} cursor={{ fill: "#f2f3ff" }} />
            <Legend iconType="circle" iconSize={8} align="left" formatter={() => "Km"} />
            <Bar dataKey="km" fill="#b6bdfc" barSize={14} radius={[10, 10, 10, 10]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
