import GptSearchBar from './GptSearchBar'
import GptMovieSugesstions from './GptMovieSugesstions'

const SparkleIcon = () => (
  <svg className="w-4 h-4 text-[#E50914]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
    <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z" />
    <path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5L5 17z" />
  </svg>
);

const GPTsearch = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#141414' }}>
      {/* Hero search area */}
      <div className="pt-28 pb-14 px-8 flex flex-col items-center text-center">
        {/* AI badge */}
        <div className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/30 rounded-full px-4 py-1.5 mb-5">
          <SparkleIcon />
          <span className="text-[#E50914] text-xs font-bold uppercase tracking-widest">
            AI Powered Search
          </span>
        </div>

        <h1 className="text-white text-4xl font-black mb-2 tracking-tight">
          Find Your Next Obsession
        </h1>
        <p className="text-zinc-400 text-sm mb-10 max-w-md leading-relaxed">
          Describe a mood, genre, or storyline — our AI picks the perfect movies for you
        </p>

        <GptSearchBar />
      </div>

      {/* Results */}
      <GptMovieSugesstions />
    </div>
  );
};

export default GPTsearch;
