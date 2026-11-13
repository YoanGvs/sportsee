import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import type { Session } from "../services/normalize";
import { addDays, startOfWeek } from "../utils/weeks";

// Objectif hebdo fixé à 6 : l'API ne le renvoie pas (limite à signaler)
const GOAL = 6;

// Résumé de la semaine la plus récente : objectif, durée, distance
export function WeekSummary({ sessions }: { sessions: Session[] }) {
  // Lundi de la dernière semaine qui contient une séance
  const monday = startOfWeek(new Date(Math.max(...sessions.map((s) => s.date.getTime()))));
  const week = sessions.filter((s) => s.date >= monday && s.date < addDays(monday, 7));

  const done = week.length;
  const minutes = week.reduce((t, s) => t + s.duration, 0);
  const km = Math.round(week.reduce((t, s) => t + s.distance, 0) * 10) / 10;

  // Max(0, ...) : pas de part négative si l'objectif est dépassé
  const pie = [{ value: done }, { value: Math.max(0, GOAL - done) }];
  const range = `Du ${monday.toLocaleDateString("fr-FR")} au ${addDays(monday, 6).toLocaleDateString("fr-FR")}`;

  return (
    <div>
      <p className="mt-2 text-sm text-muted">{range}</p>

      <div className="mt-8 grid grid-cols-[445fr_583fr] gap-6">
        <article className="rounded-2xl bg-white p-8 shadow-[0_4px_84px_-40px_#9da7fb66]">
          <p className="text-[22px] font-medium text-brand">
            x{done} <span className="text-sm font-normal text-brand-light">sur objectif de {GOAL}</span>
          </p>
          <p className="mt-2 text-xs text-muted">Courses hebdomadaire réalisées</p>

          <div className="mt-4 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                {/* startAngle 90 : le donut commence en haut et tourne dans le sens des aiguilles */}
                <Pie data={pie} dataKey="value" innerRadius="55%" outerRadius="85%" startAngle={90} endAngle={-270} stroke="none">
                  <Cell fill="#0b23f4" />
                  <Cell fill="#b6bdfc" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between text-xs text-muted">
            <span><span className="text-brand">●</span> {done} réalisées</span>
            <span><span className="text-brand-light">●</span> {Math.max(0, GOAL - done)} restants</span>
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-2xl bg-white p-8 shadow-[0_4px_84px_-40px_#9da7fb66]">
            <p className="text-xs text-muted">Durée d'activité</p>
            <p className="mt-4 text-[22px] font-medium text-brand">
              {minutes} <span className="text-sm font-normal text-brand-light">minutes</span>
            </p>
          </article>
          <article className="rounded-2xl bg-white p-8 shadow-[0_4px_84px_-40px_#9da7fb66]">
            <p className="text-xs text-muted">Distance</p>
            <p className="mt-4 text-[22px] font-medium text-accent">
              {km} <span className="text-sm font-normal text-accent-light">kilomètres</span>
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
