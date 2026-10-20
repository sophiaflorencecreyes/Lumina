import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Download, Pause, Play, Plus, Star } from 'lucide-react';
import SafeImage from '../components/SafeImage';
import CastCard from '../components/CastCard';
import { useApp } from '../context/AppContext';
import { TitleType } from '../models/enums';
import { STRINGS } from '../constants/strings';

function DetailsView({ title }) {
  const { settings, isSaved, toggleSaved } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(Boolean(location.state?.autoplay));
  const [downloaded, setDownloaded] = useState(false);
  const saved = isSaved(title.id);
  const D = STRINGS.details;

  const goBack = () => (location.key !== 'default' ? navigate(-1) : navigate('/'));

  return (
    <div className="px-4 pb-16 pt-24 sm:px-8 lg:px-14">
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <section className="relative min-h-120 overflow-hidden rounded-3xl bg-surface sm:min-h-136">
          <SafeImage
            key={title.bannerUrl}
            src={title.bannerUrl}
            alt=""
            showAlt={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-bg/85 via-bg/40 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-bg/90 via-transparent to-transparent" />

          <button
            type="button"
            onClick={goBack}
            aria-label={D.back}
            className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-accent text-bg shadow-lg transition hover:bg-white sm:left-6 sm:top-6"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
            <div className="max-w-2xl">
              <h1 className="sr-only">{title.name}</h1>
              <SafeImage
                key={title.logoUrl}
                src={title.logoUrl}
                alt=""
                className="mb-4 max-h-28 w-auto object-contain object-left sm:max-h-40"
                fallback={
                  <div className="mb-4" aria-hidden="true">
                    <p className="text-4xl font-extrabold leading-tight sm:text-5xl">{title.name}</p>
                    {title.tagline && (
                      <p className="mt-1 text-sm font-bold uppercase tracking-[0.3em] text-cream">{title.tagline}</p>
                    )}
                  </div>
                }
              />
              <p className="mb-3 flex flex-wrap items-center gap-2 text-sm font-bold">
                <Star className="h-4 w-4 fill-cream text-cream" aria-hidden="true" />
                {title.getDetailedMetaLine()}
              </p>
              <p className="mb-6 text-sm font-medium sm:text-base">{title.synopsis}</p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => toggleSaved(title)}
                  aria-pressed={saved}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent/80 px-5 py-2.5 font-bold text-bg backdrop-blur transition hover:bg-accent"
                >
                  {saved ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  {saved ? D.inList : D.addToList}
                </button>
                <button
                  type="button"
                  onClick={() => setDownloaded((v) => !v)}
                  aria-pressed={downloaded}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent/80 px-5 py-2.5 font-bold text-bg backdrop-blur transition hover:bg-accent"
                >
                  {downloaded ? <Check className="h-5 w-5" /> : <Download className="h-5 w-5" />}
                  {downloaded ? D.downloaded : D.download}
                </button>
              </div>
            </div>
          </div>
        </section>

        <aside className="flex flex-col items-center gap-4 lg:items-stretch">
          <span className="self-center rounded-full bg-teal-pill px-8 py-2 font-bold text-bg">
            {title.type === TitleType.MOVIE ? D.fullMovie : D.fullSeries}
          </span>
          <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-2xl bg-surface lg:max-w-none">
            <SafeImage
              key={title.bannerUrl}
              src={title.bannerUrl}
              alt={title.name}
              showAlt={false}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 grid place-items-center bg-black/30">
              <button
                type="button"
                onClick={() => setIsPlaying((v) => !v)}
                className="inline-flex items-center gap-2 rounded-lg bg-white/70 px-5 py-2 font-bold text-bg backdrop-blur transition hover:bg-accent"
              >
                {isPlaying ? <Pause className="h-5 w-5 fill-bg" /> : <Play className="h-5 w-5 fill-bg" />}
                {isPlaying ? D.pause : D.play}
              </button>
            </div>
            {isPlaying && (
              <p className="absolute inset-x-0 bottom-0 bg-black/70 px-3 py-1.5 text-center text-xs font-bold" aria-live="polite">
                {D.nowPlaying} · {D.quality}: {settings.quality}
              </p>
            )}
          </div>
        </aside>
      </div>

      <section className="mt-10">
        <div className="border-l-2 border-accent pl-4">
          <h2 className="text-2xl font-bold text-accent">{D.cast}</h2>
          <p className="text-sm font-bold">{D.castSubtitle}</p>
        </div>
        {title.cast.length > 0 ? (
          <div className="no-scrollbar mt-4 flex gap-4 overflow-x-auto pb-2">
            {title.cast.map((member) => (
              <CastCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <p className="mt-4 font-bold text-muted">{D.noCast}</p>
        )}
      </section>
    </div>
  );
}

export default function TitleDetails() {
  const { id } = useParams();
  const { catalog } = useApp();
  const title = catalog.getById(id);

  if (!title) {
    return (
      <div className="px-4 pb-16 pt-40 text-center">
        <h1 className="text-3xl font-extrabold">{STRINGS.details.notFoundTitle}</h1>
        <p className="mt-2 text-muted">{STRINGS.details.notFoundText}</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-accent px-6 py-2 font-bold text-bg">
          {STRINGS.details.backHome}
        </Link>
      </div>
    );
  }

  return <DetailsView key={title.id} title={title} />;
}