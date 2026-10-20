import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    // Changed bg-bg to the Lumina hex color
    <div className="relative min-h-screen bg-[#141b24] font-sans text-white">
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
}