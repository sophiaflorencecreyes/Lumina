import { useMemo, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import TitleCard from '../components/TitleCard';
import TitleRow from '../components/TitleRow';
import { useApp } from '../context/AppContext';
import { STRINGS } from '../constants/strings';

export default function Search() {
  const { catalog, settings, history, addSearchTerm, clearSearchHistory } = useApp();
  const [query, setQuery] = useState('');

  const results = useMemo(() => catalog.search(query), [catalog, query]);
  const hasQuery = query.trim().length > 0;
  const recent = settings.recentSearches ? history.getRecent(5) : [];

  return (
    <div className="px-4 pb-16 pt-28 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold tracking-[0.3em]">{STRINGS.search.eyebrow}</p>
        <h1 className="mt-6 text-4xl font-extrabold sm:text-6xl">{STRINGS.search.heading}</h1>
        <p className="mt-3 text-sm font-bold sm:text-base">{STRINGS.search.subheading}</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addSearchTerm(query);
          }}
          className="mt-8 flex items-center gap-3 rounded-2xl border border-teal-pill bg-surface-alt px-5 py-4 focus-within:border-accent"
        >
          <SearchIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={STRINGS.search.placeholder}
            aria-label={STRINGS.search.label}
            className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:text-muted"
          />
        </form>

        {!hasQuery && recent.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm font-bold text-muted">{STRINGS.search.recent}</span>
            {recent.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="rounded-full bg-surface-alt px-4 py-1 text-sm font-bold transition hover:bg-teal-pill hover:text-bg"
              >
                {term}
              </button>
            ))}
            <button type="button" onClick={clearSearchHistory} className="text-sm font-bold text-accent underline">
              {STRINGS.search.clear}
            </button>
          </div>
        )}
      </div>

      {hasQuery ? (
        <section className="mt-10" aria-live="polite">
          {results.length > 0 ? (
            <>
              <p className="mb-4 text-xl font-bold">{STRINGS.resultCount(results.length)}</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
                {results.map((t) => (
                  <TitleCard key={t.id} title={t} onOpen={() => addSearchTerm(query)} />
                ))}
              </div>
            </>
          ) : (
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold">{STRINGS.search.noResults(query.trim())}</h2>
              <p className="mt-2 text-muted">{STRINGS.search.noResultsHint}</p>
            </div>
          )}
        </section>
      ) : (
        <div className="-mx-4 mt-8 sm:-mx-8 lg:-mx-14">
          <TitleRow heading={STRINGS.search.trending} titles={catalog.getTrending(8)} />
        </div>
      )}
    </div>
  );
}