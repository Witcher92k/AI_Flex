
import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
import {useDispatch, useSelector} from "react-redux";
import { addMovieTrailer } from '../utils/movieSlice';


const useMovieTrailer = ({id})=>{


    const dispatch = useDispatch();

    const movieTrailerData = useSelector(store=>store.movies?.movieTrailer);



    useEffect(() => {
        getMovieTrailer();
    }, [])


    const getMovieTrailer = async () => {



        const apiurl = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;


        const data = await fetch(apiurl, API_OPTIONS);
        const json = await data.json();
        const trailer_data = json.results.filter(item => item.type == 'Trailer')[0].key;
        dispatch(addMovieTrailer(trailer_data));

        console.log(trailer_data);


    }



    return movieTrailerData;


}

export default useMovieTrailer;