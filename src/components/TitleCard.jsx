import { Link } from 'react-router-dom';
import { Check, Plus, Star, X } from 'lucide-react';
import SafeImage from './SafeImage';
import { useApp } from '../context/AppContext';
import { STRINGS } from '../constants/strings';

export default function TitleCard({ title, onRemove = null, onOpen = null, className = '' }) {
  const { settings, isSaved, toggleSaved } = useApp();
  const saved = isSaved(title.id);

  return (
    <div className={`group relative ${className}`}>
      <Link
        to={`/title/${title.id}`}
        state={{ autoplay: settings.autoPlay }}
        onClick={onOpen ?? undefined}
        aria-label={title.name}
        className="relative block aspect-[2/3] overflow-hidden rounded-lg bg-surface shadow-lg ring-accent transition duration-200 hover:-translate-y-1 focus-visible:ring-2"
      >
        <SafeImage src={title.posterUrl} alt={title.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/20 to-transparent p-3 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
          <p className="line-clamp-2 text-sm font-bold">{title.name}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-cream">
            <Star className="h-3 w-3 fill-cream" aria-hidden="true" />
            {title.rating.toFixed(1)} · {title.releaseYear}
          </p>
        </div>
      </Link>

      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={STRINGS.myList.remove}
          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/70 text-white transition hover:bg-red-500"
        >
          <X className="h-4 w-4" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => toggleSaved(title)}
          aria-label={saved ? STRINGS.details.inList : STRINGS.myList.add}
          aria-pressed={saved}
          className={`absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full transition md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100 ${
            saved ? 'bg-accent text-bg' : 'bg-black/70 text-white hover:bg-accent hover:text-bg'
          }`}
        >
          {saved ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
}