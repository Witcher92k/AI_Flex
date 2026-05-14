import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const SecondaryContainer = () => {

    const movies = useSelector((store) => store.movies);

    return (
        movies.nowPlaying && (
            <div className="bg-black">
                <div className="-mt-52 pl-12 relative z-20">
                    <MovieList title={"Now Playing"} movieList={movies.nowPlaying} />
                    <MovieList title={"Trending"} movieList={movies.nowPlaying} />
                    <MovieList title={"Popular"} movieList={movies.nowPlaying} />
                    <MovieList
                        title={"Upcoming Movies"}
                        movieList={movies.nowPlaying}
                    />
                    <MovieList title={"Horror"} movieList={movies.nowPlaying} />
                </div>
            </div>
        )
    );
}

export default SecondaryContainer
