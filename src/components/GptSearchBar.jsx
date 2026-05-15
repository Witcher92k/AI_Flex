import React, { useEffect ,useRef} from 'react'
import { API_OPTIONS, GEMINI_KEY } from '../utils/constants';
// import {addGptMovies} from './gptS'
import {useDispatch} from 'react-redux';
import { addGptMovies} from '../utils/gptSlice';


import callGemini from '../utils/openai';

const  GptSearchBar = () => {



    const dispatch = useDispatch();

    const searchMovie = async (movieName) => {


        const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`, API_OPTIONS);

        const result = await data.json();

        return result.results



    }








    const searchText = useRef(null);

    const  performSearch = ()=>{

        callSuggestionAPI();
    }


    const callSuggestionAPI = async () => {

        const prompt = `You are a movie recommendation engine. Based on the query: "${searchText.current.value}", suggest exactly 5 movies. Return ONLY a comma-separated list of movie names with no extra text, numbering, or explanation. Example: Inception,Interstellar,The Matrix,Tenet,Arrival`;

        try{

        const result = await callGemini(prompt);
        
        const data = result.split(',');

        const  promiseArray = data.map(item=>searchMovie(item));

        //here result will be array of promises

        const allMovieResult = await Promise.all(promiseArray);

            const movieNames = data;
            const MovieObject = allMovieResult;
            dispatch(addGptMovies({ movieNames, MovieObject }));

    
        console.log(allMovieResult);

        }

        catch(e){

            console.log(e);



        }

    }



    //    useEffect(()=>{

    //     callSuggestionAPI();

    // },[])






  return (
    <div className='w-full max-w-2xl px-4'>
        <form onSubmit={(e)=>e.preventDefault()} className='flex items-center bg-white rounded-full overflow-hidden shadow-lg'>
            <input ref={searchText} 
                className='flex-1 px-6 py-4 text-black text-lg outline-none bg-transparent placeholder-gray-400'
                placeholder='What do you want to watch today?'
                type='text'
            />
            <button onClick={()=>{
                performSearch();
            }}
                type='submit'
                className='bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 text-lg transition-colors cursor-pointer'
            >
                Search
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar;