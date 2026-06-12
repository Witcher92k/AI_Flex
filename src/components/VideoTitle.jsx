const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* Gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-64 px-16 text-white max-w-2xl pointer-events-auto">
        {/* N badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#E50914] font-black text-base tracking-tight">N</span>
          <span className="text-white/75 text-xs tracking-[0.25em] uppercase font-light">Series</span>
        </div>

        <h1 className="text-5xl font-black mb-4 leading-tight drop-shadow-xl tracking-tight">
          {title}
        </h1>

        <p className="text-sm text-white/80 mb-7 leading-relaxed line-clamp-3 max-w-md font-light">
          {overview}
        </p>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold text-base rounded hover:bg-white/85 active:bg-white/70 transition-colors shadow-lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>
          <button className="flex items-center gap-2 px-8 py-3 text-white font-semibold text-base rounded hover:bg-white/20 active:bg-white/10 transition-colors border border-white/30 backdrop-blur-sm bg-white/10">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
