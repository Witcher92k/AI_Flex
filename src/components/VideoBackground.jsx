

import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
import {useDispatch, useSelector} from "react-redux";
import { addMovieTrailer } from '../utils/movieSlice';

import useMovieTrailer from '../customHooks/useMovieTrailer';

const VideoBackground = ({ id }) => {


    const movieTrailerData = useMovieTrailer({id});


    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <iframe
                className="w-full h-full scale-125"
                src={`https://www.youtube.com/embed/${movieTrailerData}?autoplay=1&mute=1&controls=0&loop=1&playlist=${movieTrailerData}`}
                title="Movie Trailer"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
            />
        </div>
    )




}

export default VideoBackground