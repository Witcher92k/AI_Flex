import { useDispatch } from "react-redux";

import { API_OPTIONS } from "../utils/constants";

import { addMovies } from "../utils/movieSlice";

import { useEffect } from "react";

const useNowPlayingList  = ()=>{

// const [movieList,setMovieList] = useState([]);

  const dispatch = useDispatch();

  const fetchMovies = async () => {



    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);

    const result = await data.json();

    dispatch(addMovies(result.results));

    // setMovieList(result.results);
    
    console.log(result);


  }


  useEffect(()=>{
    fetchMovies();
  },[])




}

export default useNowPlayingList;