import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import MovieCard from './MovieCard';
import useMovieDetails from '../customHooks/useMovieDetails';
import { addToMyList, removeFromMyList } from '../utils/myListSlice';

const IMG_ORIGINAL = 'https://image.tmdb.org/t/p/original';
const IMG_FACE     = 'https://image.tmdb.org/t/p/w185';

/* ─── tiny helpers ─── */
const StarIcon = () => (
    <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const MetaTag = ({ children }) => (
    <span className="border border-white/30 text-white/70 text-xs px-2 py-0.5 rounded">
        {children}
    </span>
);

const LoadingScreen = () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
            <svg className="animate-spin h-10 w-10 mx-auto mb-4 text-[#E50914]" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <p className="text-zinc-500 text-sm tracking-wide">Loading…</p>
        </div>
    </div>
);

/* ─── main component ─── */
const MoviePage = () => {
    const { id }    = useParams();
    const navigate  = useNavigate();
    const dispatch  = useDispatch();
    const myList    = useSelector(store => store.myList.items);
    const { movie, trailer, cast, similar, loading } = useMovieDetails(id);
    const [liked, setLiked] = useState(false);

    if (loading) return <LoadingScreen />;
    if (!movie)  return null;

    const movieId  = Number(id);
    const isInList = myList.some(m => m.id === movieId);

    const toggleMyList = () => {
        if (isInList) {
            dispatch(removeFromMyList(movieId));
        } else {
            dispatch(addToMyList({
                id: movieId,
                poster_path: movie.poster_path,
                title: movie.title,
            }));
        }
    };

    const year    = movie.release_date?.slice(0, 4);
    const runtime = movie.runtime
        ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
        : null;
    const score   = movie.vote_average ? movie.vote_average.toFixed(1) : null;

    return (
        <div className="bg-black min-h-screen text-white">
            <Header />

            {/* ── HERO ── */}
            <div className="relative h-[72vh] overflow-hidden">
                {trailer ? (
                    <iframe
                        className="absolute inset-0 w-full h-full scale-[1.3]"
                        src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer}&rel=0&modestbranding=1`}
                        title={movie.title}
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                    />
                ) : (
                    <img
                        src={IMG_ORIGINAL + movie.backdrop_path}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                )}

                {/* gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

                {/* back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-24 left-8 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/40 hover:bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                    </svg>
                    Back
                </button>

                {/* content overlay */}
                <div className="absolute bottom-10 left-0 px-16 max-w-2xl z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[#E50914] font-black text-base">N</span>
                        <span className="text-white/60 text-xs tracking-[0.25em] uppercase font-light">FILM</span>
                    </div>

                    <h1 className="text-5xl font-black mb-2 leading-tight tracking-tight drop-shadow-2xl">
                        {movie.title}
                    </h1>

                    {movie.tagline && (
                        <p className="text-white/50 text-sm italic mb-4">{movie.tagline}</p>
                    )}

                    {/* metadata row */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        {score && (
                            <div className="flex items-center gap-1">
                                <StarIcon />
                                <span className="text-yellow-400 font-semibold text-sm">{score}</span>
                                <span className="text-zinc-500 text-xs">/ 10</span>
                            </div>
                        )}
                        <div className="w-px h-4 bg-white/20" />
                        {year    && <span className="text-white/70 text-sm">{year}</span>}
                        {runtime && <span className="text-white/70 text-sm">{runtime}</span>}
                        <MetaTag>HD</MetaTag>
                        <MetaTag>CC</MetaTag>
                    </div>

                    {/* genres */}
                    {movie.genres?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {movie.genres.map(g => (
                                <span
                                    key={g.id}
                                    className="text-xs bg-white/10 border border-white/20 text-white/80 px-3 py-1 rounded-full"
                                >
                                    {g.name}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* action buttons */}
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold text-base rounded hover:bg-white/90 active:scale-95 transition-all shadow-lg">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            Play
                        </button>

                        {/* My List toggle */}
                        <button
                            onClick={toggleMyList}
                            className={`flex items-center gap-2 px-6 py-3 font-semibold text-base rounded active:scale-95 transition-all border ${
                                isInList
                                    ? 'bg-white text-black border-white hover:bg-white/90'
                                    : 'bg-white/15 backdrop-blur-sm text-white border-white/20 hover:bg-white/25'
                            }`}
                        >
                            {isInList ? (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    In My List
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                    My List
                                </>
                            )}
                        </button>

                        {/* Like toggle */}
                        <button
                            onClick={() => setLiked(v => !v)}
                            title={liked ? 'Unlike' : 'Like'}
                            className={`w-11 h-11 flex items-center justify-center backdrop-blur-sm rounded-full active:scale-95 transition-all border ${
                                liked
                                    ? 'bg-white text-black border-white'
                                    : 'bg-white/15 text-white border-white/20 hover:bg-white/25'
                            }`}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* ── BODY ── */}
            <div className="px-16 py-12">

                {/* Overview + sidebar */}
                <div className="grid grid-cols-3 gap-14 mb-14">
                    <div className="col-span-2">
                        <p className="text-white/85 text-base leading-relaxed">{movie.overview}</p>
                    </div>
                    <div className="space-y-3 text-sm">
                        {cast.length > 0 && (
                            <p>
                                <span className="text-zinc-500">Cast: </span>
                                <span className="text-white/75">{cast.slice(0, 5).map(c => c.name).join(', ')}</span>
                            </p>
                        )}
                        {movie.genres?.length > 0 && (
                            <p>
                                <span className="text-zinc-500">Genres: </span>
                                <span className="text-white/75">{movie.genres.map(g => g.name).join(', ')}</span>
                            </p>
                        )}
                        {movie.production_countries?.length > 0 && (
                            <p>
                                <span className="text-zinc-500">Country: </span>
                                <span className="text-white/75">{movie.production_countries.map(c => c.name).join(', ')}</span>
                            </p>
                        )}
                        {movie.status && (
                            <p>
                                <span className="text-zinc-500">Status: </span>
                                <span className="text-white/75">{movie.status}</span>
                            </p>
                        )}
                    </div>
                </div>

                {/* Cast */}
                {cast.length > 0 && (
                    <section className="mb-14">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-6 rounded-full bg-[#E50914]" />
                            <h2 className="text-white text-xl font-bold tracking-tight">Cast</h2>
                        </div>
                        <div className="flex gap-5 overflow-x-scroll no-scrollbar pb-2">
                            {cast.map(person => (
                                <div key={person.id} className="flex flex-col items-center gap-2 shrink-0 w-20">
                                    {person.profile_path ? (
                                        <img
                                            src={IMG_FACE + person.profile_path}
                                            alt={person.name}
                                            className="w-16 h-16 rounded-full object-cover ring-2 ring-white/10 hover:ring-[#E50914]/60 transition-all"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center ring-2 ring-white/10">
                                            <svg className="w-7 h-7 text-zinc-600" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                                            </svg>
                                        </div>
                                    )}
                                    <p className="text-white text-xs font-semibold text-center leading-tight line-clamp-2">{person.name}</p>
                                    <p className="text-zinc-500 text-xs text-center leading-tight line-clamp-2">{person.character}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* More Like This */}
                {similar.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-6 rounded-full bg-[#E50914]" />
                            <h2 className="text-white text-xl font-bold tracking-tight">More Like This</h2>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                            {similar.slice(0, 18).map(m => (
                                <MovieCard
                                    key={m.id}
                                    id={m.id}
                                    poster_path={m.poster_path}
                                    title={m.original_title || m.title}
                                    vote_average={m.vote_average}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default MoviePage;
