import { useState } from 'react';

const initialsOf = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

export default function SafeImage({ src, alt, className = '', fallback = null, initials = false, showAlt = true }) {
  const [failedSrc, setFailedSrc] = useState(null);

  if (!src || failedSrc === src) {
    if (fallback) return fallback;
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-linear-to-br from-surface-alt to-teal-deep p-2 text-center ${className}`}
      >
        {initials ? (
          <span className="text-2xl font-extrabold text-accent">{initialsOf(alt)}</span>
        ) : (
          showAlt && <span className="line-clamp-4 text-sm font-bold text-cream">{alt}</span>
        )}
      </div>
    );
  }

  return <img src={src} alt={alt} loading="lazy" onError={() => setFailedSrc(src)} className={className} />;
}