import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Header from './Header';
import MovieList from './MovieList';
import useMovieLists from '../customHooks/useMovieLists';

const IMG_ORIGINAL = 'https://image.tmdb.org/t/p/original';

const MoviesPage = () => {
    useMovieLists();
    const { nowPlaying, trending, popular, topRated, upcoming } = useSelector(store => store.movies);
    const navigate = useNavigate();
    const hero = trending?.[1] || nowPlaying?.[0];

    return (
        <div className="bg-black min-h-screen text-white">
            <Header />

            {/* Hero */}
            {hero && (
                <div className="relative h-[60vh] overflow-hidden">
                    <img
                        src={IMG_ORIGINAL + hero.backdrop_path}
                        alt={hero.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

                    <div className="absolute bottom-16 left-16 max-w-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-[#E50914] font-black text-base">N</span>
                            <span className="text-white/60 text-xs tracking-widest uppercase font-light">Film</span>
                        </div>
                        <h1 className="text-4xl font-black mb-3 leading-tight tracking-tight">{hero.title}</h1>
                        <p className="text-white/75 text-sm leading-relaxed line-clamp-2 mb-5 max-w-md">{hero.overview}</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate(`/movie/${hero.id}`)}
                                className="flex items-center gap-2 px-7 py-2.5 bg-white text-black font-bold rounded hover:bg-white/90 transition-colors shadow-lg"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                                Play
                            </button>
                            <button
                                onClick={() => navigate(`/movie/${hero.id}`)}
                                className="flex items-center gap-2 px-7 py-2.5 bg-white/15 backdrop-blur-sm text-white font-semibold rounded hover:bg-white/25 transition-colors border border-white/20"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={`bg-black ${hero ? '-mt-28' : 'pt-24'} pl-16 pr-4 pb-20 relative z-20`}>
                {nowPlaying && <MovieList title="Now Playing" movieList={nowPlaying} />}
                {trending   && <MovieList title="Trending"    movieList={trending}   />}
                {popular    && <MovieList title="Popular"     movieList={popular}    />}
                {topRated   && <MovieList title="Top Rated"   movieList={topRated}   />}
                {upcoming   && <MovieList title="Upcoming"    movieList={upcoming}   />}
            </div>
        </div>
    );
};

export default MoviesPage;
