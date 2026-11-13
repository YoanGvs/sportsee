// Flèches précédent / suivant autour du libellé d'une période
type Props = {
  label: string;
  onPrev: () => void;
  onNext: () => void;
  nextDisabled: boolean;
};

export function PeriodNav({ label, onPrev, onNext, nextDisabled }: Props) {
  const button =
    "flex h-6 w-6 items-center justify-center rounded-full border border-muted text-xs disabled:opacity-30";

  return (
    <div className="flex items-center gap-2 text-xs">
      <button type="button" onClick={onPrev} className={button} aria-label="Période précédente">
        ‹
      </button>
      <span>{label}</span>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className={button}
        aria-label="Période suivante"
      >
        ›
      </button>
    </div>
  );
}
