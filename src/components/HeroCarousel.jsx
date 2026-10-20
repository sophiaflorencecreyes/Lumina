import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, Play, Star } from 'lucide-react';
import SafeImage from './SafeImage';
import { STRINGS } from '../constants/strings';

const ROTATE_MS = 6000;

export default function HeroCarousel({ titles }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = titles.length;

  useEffect(() => {
    if (paused || count < 2) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  if (count === 0) return null;
  const title = titles[index % count];
  const rank = title.getRankLabel();

  return (
    <section
      className="relative h-144 overflow-hidden bg-teal-deep sm:h-160 lg:h-176"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <SafeImage
        key={title.bannerUrl}
        src={title.bannerUrl}
        alt={title.name}
        showAlt={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-bg/90 via-bg/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-bg/30" />

      <div className="absolute inset-x-0 bottom-0 px-4 pb-24 sm:px-8 sm:pb-20 lg:px-14">
        <div className="max-w-2xl">
          <h1 className="sr-only">{title.name}</h1>
          <SafeImage
            key={title.logoUrl}
            src={title.logoUrl}
            alt=""
            className="mb-4 max-h-28 w-auto object-contain object-left sm:max-h-40"
            fallback={
              <div className="mb-4" aria-hidden="true">
                <p className="text-4xl font-extrabold leading-tight sm:text-6xl">{title.name}</p>
                {title.tagline && (
                  <p className="mt-1 text-sm font-bold uppercase tracking-[0.3em] text-cream">{title.tagline}</p>
                )}
              </div>
            }
          />
          <p className="mb-3 flex items-center gap-2 text-sm font-bold sm:text-base">
            <Star className="h-4 w-4 fill-cream text-cream" aria-hidden="true" />
            {title.getMetaLine()}
          </p>
          <p className="mb-6 line-clamp-4 max-w-xl text-sm font-medium text-white/90 sm:text-base">{title.synopsis}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/title/${title.id}`}
              state={{ autoplay: true }}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 font-bold text-bg transition hover:bg-white"
            >
              <Play className="h-5 w-5 fill-bg" aria-hidden="true" />
              {STRINGS.hero.play}
            </Link>
            <Link
              to={`/title/${title.id}`}
              className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-6 py-2.5 font-bold text-white backdrop-blur transition hover:bg-white/30"
            >
              <Info className="h-5 w-5" aria-hidden="true" />
              {STRINGS.hero.moreInfo}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-4 px-4 sm:inset-x-auto sm:right-8 sm:items-end lg:right-14">
        {rank && (
          <span className="hidden rounded-full bg-surface-alt/70 px-8 py-3 text-lg font-bold backdrop-blur sm:block">
            {rank}
          </span>
        )}
        {count > 1 && (
          <div className="flex gap-2">
            {titles.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={STRINGS.hero.slide(i + 1)}
                aria-current={i === index % count}
                className={`h-3 rounded-full transition-all ${i === index % count ? 'w-8 bg-accent' : 'w-5 bg-white'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}