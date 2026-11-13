// Carte bleue de statistique : un titre, une valeur et son unité
export function StatCard({ title, value, unit }: { title: string; value: string | number; unit: string }) {
  return (
    <article className="rounded-xl bg-brand px-8 py-5 text-white">
      <p className="text-sm">{title}</p>
      <p className="mt-5 text-[22px] font-medium">
        {value} <span className="text-base font-normal text-brand-light">{unit}</span>
      </p>
    </article>
  );
}
