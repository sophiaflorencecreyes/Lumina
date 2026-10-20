import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, Settings, Sparkle, X } from 'lucide-react';
import { NAV_ITEMS } from '../data/nav';
import { STRINGS } from '../constants/strings';
import { asset } from '../data/images'; 

const pillClass = ({ isActive }) =>
  `rounded-full px-5 py-1.5 text-sm font-bold text-bg transition ${
    isActive ? 'bg-accent' : 'bg-teal-pill hover:bg-teal-pill/80'
  }`;

const iconClass = ({ isActive }) =>
  `grid h-10 w-10 place-items-center rounded-full text-bg shadow transition ${
    isActive ? 'bg-white' : 'bg-white/70 hover:bg-accent'
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const lastIndex = NAV_ITEMS.length - 1;

  return (
    <header className="absolute inset-x-0 top-0 z-40 bg-linear-to-b from-teal-deep/90 to-transparent">
      <div className="mx-auto flex max-w-360 items-center justify-between gap-4 px-4 py-4 sm:px-8 lg:px-14">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-wider text-white">
  <img 
    src={asset.logo('logo-removebg.png')} 
    alt="Lumina Logo" 
    className="h-10 w-auto object-contain" 
  />
</Link>

        {/* DESKTOP NAVIGATION */}
        <nav aria-label={STRINGS.nav.main} className="hidden items-center gap-2 rounded-full bg-surface-alt/80 px-4 py-2 shadow-lg md:flex">
          {NAV_ITEMS.map((item, i) => (
            <div key={item.path} className="flex items-center gap-2">
              {i === lastIndex && <span className="mx-2 h-8 w-px bg-white/70" aria-hidden="true" />}
              <NavLink to={item.path} end={item.path === '/'} className={pillClass}>
                {item.label}
              </NavLink>
            </div>
          ))}
        </nav>

        {/* RIGHT SIDE ICONS */}
        <div className="flex items-center gap-2">
          <NavLink to="/search" className={iconClass} aria-label={STRINGS.nav.search}>
            <Search className="h-5 w-5" />
          </NavLink>
          <NavLink to="/settings" className={iconClass} aria-label={STRINGS.nav.settings}>
            <Settings className="h-5 w-5" />
          </NavLink>
          
          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? STRINGS.nav.closeMenu : STRINGS.nav.openMenu}
            className="grid h-10 w-10 place-items-center rounded-full bg-surface-alt text-white md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <nav aria-label={STRINGS.nav.main} className="mx-4 flex flex-col gap-2 rounded-2xl bg-surface p-3 shadow-xl md:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setOpen(false)}
              className={pillClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}