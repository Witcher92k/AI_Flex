import { useRef } from 'react'
import MovieCard from './MovieCard'

const ChevronLeft = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
  </svg>
);

const MovieList = ({ title, movieList }) => {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: dir * 700, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-10 group/row">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3 pr-4">
        <h2 className="text-white text-lg font-semibold tracking-wide hover:text-zinc-300 transition-colors cursor-default">
          {title}
        </h2>
        <button className="text-[#54B3D6] text-xs font-semibold uppercase tracking-widest opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 hover:text-white flex items-center gap-1">
          Explore All
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Scrollable row with arrow buttons */}
      <div className="relative">
        {/* Left scroll button */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-gradient-to-r from-black/80 to-transparent opacity-0 group-hover/row:opacity-100 hover:from-black/95 transition-all duration-200"
          aria-label="Scroll left"
        >
          <ChevronLeft />
        </button>

        {/* Movie cards */}
        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-scroll no-scrollbar scroll-smooth"
        >
          {movieList.map(item => (
            <MovieCard
              key={item.id}
              id={item.id}
              poster_path={item.poster_path}
              title={item.original_title || item.title}
              vote_average={item.vote_average}
            />
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-gradient-to-l from-black/80 to-transparent opacity-0 group-hover/row:opacity-100 hover:from-black/95 transition-all duration-200"
          aria-label="Scroll right"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default MovieList;
