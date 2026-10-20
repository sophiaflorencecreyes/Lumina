import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TitleCard from './TitleCard';

export default function TitleRow({ heading, titles }) {
  // 1. Create the ref for the scroll container
  const rowRef = useRef(null);

  if (titles.length === 0) return null;

  // 2. The scroll function
  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      // Scroll by the width of the container in the chosen direction
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="px-4 py-6 sm:px-8 lg:px-14">
      <h2 className="mb-4 text-xl font-bold sm:text-2xl">{heading}</h2>
      
      {/* 3. Wrap the scroll area in a relative div for button positioning */}
      <div className="relative group/row">
        
        {/* LEFT BUTTON (Hidden on mobile) */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-0 bottom-3 z-10 hidden md:flex w-12 items-center justify-center bg-gradient-to-r from-black/80 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 rounded-l-md"
          aria-label="Scroll left"
        >
          <ChevronLeft className="text-white h-10 w-10" />
        </button>

        {/* SCROLLABLE CONTAINER */}
        <div 
          ref={rowRef}
          className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0"
        >
          {titles.map((t) => (
            <TitleCard 
              key={t.id} 
              title={t} 
              className="w-36 shrink-0 snap-start sm:w-40 md:w-44 lg:w-52" 
            />
          ))}
        </div>

        {/* RIGHT BUTTON (Hidden on mobile) */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-0 bottom-3 z-10 hidden md:flex w-12 items-center justify-center bg-gradient-to-l from-black/80 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 rounded-r-md"
          aria-label="Scroll right"
        >
          <ChevronRight className="text-white h-10 w-10" />
        </button>

      </div>
    </section>
  );
}