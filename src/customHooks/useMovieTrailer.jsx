
import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from "react-redux";
import { addMovieTrailer } from '../utils/movieSlice';


const useMovieTrailer = ({ id }) => {

    const dispatch = useDispatch();

    const movieTrailerData = useSelector(store => store.movies?.movieTrailer);

    useEffect(() => {
        getMovieTrailer();
    }, [id])

    const getMovieTrailer = async () => {
        try {
            const data = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
                API_OPTIONS
            );
            const json = await data.json();
            const videos = json.results ?? [];

            // Prefer official Trailer, fall back to Teaser, then any video
            const video =
                videos.find(v => v.type === 'Trailer' && v.site === 'YouTube') ||
                videos.find(v => v.type === 'Teaser' && v.site === 'YouTube') ||
                videos.find(v => v.site === 'YouTube');

            if (video?.key) {
                dispatch(addMovieTrailer(video.key));
            }
        } catch (e) {
            console.error('Failed to fetch trailer:', e);
        }
    }



    return movieTrailerData;


}

export default useMovieTrailer;