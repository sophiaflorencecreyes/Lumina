import { Link } from 'react-router-dom';
import { STRINGS } from '../constants/strings';

export default function NotFound() {
  return (
    <div className="px-4 pb-16 pt-40 text-center">
      <p className="text-7xl font-extrabold text-accent">{STRINGS.notFound.code}</p>
      <h1 className="mt-4 text-3xl font-extrabold">{STRINGS.notFound.heading}</h1>
      <p className="mt-2 text-muted">{STRINGS.notFound.text}</p>
      <Link to="/" className="mt-6 inline-block rounded-full bg-accent px-6 py-2 font-bold text-bg">
        {STRINGS.notFound.home}
      </Link>
    </div>
  );
}