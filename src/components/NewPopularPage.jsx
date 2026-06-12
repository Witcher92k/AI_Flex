import { useSelector } from 'react-redux';
import Header from './Header';
import MovieList from './MovieList';
import useMovieLists from '../customHooks/useMovieLists';
import useTvLists from '../customHooks/useTvLists';

const NewPopularPage = () => {
    useMovieLists();
    useTvLists();

    const trending   = useSelector(store => store.movies.trending);
    const upcoming   = useSelector(store => store.movies.upcoming);
    const topRated   = useSelector(store => store.movies.topRated);
    const trendingTv = useSelector(store => store.tv.trendingTv);
    const onAir      = useSelector(store => store.tv.onAir);

    const hasContent = trending || trendingTv || upcoming;

    return (
        <div className="bg-black min-h-screen text-white">
            <Header />

            <div className="pt-28 px-16 pb-20">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-1 h-8 bg-[#E50914] rounded-full" />
                    <h1 className="text-3xl font-black tracking-tight">New &amp; Popular</h1>
                </div>

                {!hasContent && (
                    <div className="flex items-center justify-center py-32">
                        <svg className="animate-spin h-8 w-8 text-[#E50914]" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                    </div>
                )}

                {trending    && <MovieList title="Trending Movies This Week" movieList={trending}    />}
                {trendingTv  && <MovieList title="Trending TV This Week"     movieList={trendingTv}  />}
                {upcoming    && <MovieList title="Coming Soon"               movieList={upcoming}    />}
                {onAir       && <MovieList title="Now On TV"                 movieList={onAir}       />}
                {topRated    && <MovieList title="All-Time Best"             movieList={topRated}    />}
            </div>
        </div>
    );
};

export default NewPopularPage;
