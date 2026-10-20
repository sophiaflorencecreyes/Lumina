import { useMemo, useState } from 'react';
import FilterDropdown from '../components/FilterDropdown';
import TitleCard from '../components/TitleCard';
import { useApp } from '../context/AppContext';
import { FilterCriteria } from '../models/FilterCriteria';
import { STRINGS } from '../constants/strings';

export default function Discover() {
  const { catalog } = useApp();
  const [criteria, setCriteria] = useState(() => new FilterCriteria());

  const definitions = useMemo(() => catalog.getFilterDefinitions(), [catalog]);
  const results = useMemo(() => catalog.filter(criteria), [catalog, criteria]);

  const handleChange = (key, value) => setCriteria((prev) => prev.with(key, value));

  return (
    <div className="px-4 pb-16 pt-28 sm:px-8 lg:px-14">
      <div className="flex flex-wrap gap-3 lg:justify-center">
        {definitions.map((def) => (
          <FilterDropdown key={def.key} definition={def} value={criteria[def.key]} onChange={handleChange} />
        ))}
      </div>

      <p className="mt-8 text-xl font-bold" aria-live="polite">
        {STRINGS.titleCount(results.length)}
      </p>

      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
          {results.map((t) => (
            <TitleCard key={t.id} title={t} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold">{STRINGS.discover.emptyTitle}</h2>
          <p className="mt-2 text-muted">{STRINGS.discover.emptyText}</p>
          <button
            type="button"
            onClick={() => setCriteria(criteria.reset())}
            className="mt-6 rounded-full bg-accent px-6 py-2 font-bold text-bg transition hover:bg-white"
          >
            {STRINGS.discover.reset}
          </button>
        </div>
      )}
    </div>
  );
}