import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FilterDropdown({ definition, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const selected = definition.options.find((o) => o.value === value);
  const hasClearOption = definition.options.some((o) => o.value === null);
  const isActive = hasClearOption && value !== null;

  let text = definition.label;
  if (definition.prefix) text = `${definition.prefix} ${selected?.label ?? ''}`;
  else if (isActive) text = selected.label;

  return (
    <div ref={ref} className="relative" onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-bg transition sm:text-base ${
          isActive ? 'bg-accent' : 'bg-teal-pill hover:bg-teal-pill/80'
        }`}
      >
        {text}
        <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={definition.label}
          className="absolute left-0 z-30 mt-2 max-h-64 min-w-full overflow-auto rounded-2xl bg-surface-alt p-1 shadow-xl"
        >
          {definition.options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.label} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(definition.key, option.value);
                    setOpen(false);
                  }}
                  className={`w-full whitespace-nowrap rounded-xl px-4 py-2 text-left text-sm font-bold transition ${
                    isSelected ? 'bg-accent text-bg' : 'text-white hover:bg-white/10'
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}