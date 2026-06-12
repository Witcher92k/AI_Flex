import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const SecondaryContainer = () => {
    const { nowPlaying, trending, popular, topRated, upcoming } = useSelector(
        store => store.movies
    );

    if (!nowPlaying) return null;

    return (
        <div className="bg-black">
            <div className="-mt-36 pl-16 pr-4 pb-20 relative z-20">
                {nowPlaying && <MovieList title="Now Playing"    movieList={nowPlaying} />}
                {trending    && <MovieList title="Trending Now"   movieList={trending}   />}
                {popular     && <MovieList title="Popular"        movieList={popular}    />}
                {topRated    && <MovieList title="Top Rated"      movieList={topRated}   />}
                {upcoming    && <MovieList title="Upcoming"       movieList={upcoming}   />}
            </div>
        </div>
    );
};

export default SecondaryContainer;
