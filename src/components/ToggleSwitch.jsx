export default function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-8 w-14 shrink-0 rounded-full transition ${checked ? 'bg-accent' : 'bg-white/80'}`}
    >
      <span
        className={`absolute top-1 h-6 w-6 rounded-full bg-surface-alt transition-all ${checked ? 'left-7' : 'left-1'}`}
      />
    </button>
  );
}