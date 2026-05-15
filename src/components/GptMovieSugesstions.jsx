import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSugesstions = () => {

  const movieListNames = useSelector(store => store.gpt.movieNameList);
  const movieListObject = useSelector(store => store.gpt.gptSuggestedMovieList);

  if (!movieListNames) {
    return null;
  }


  return (
    <div className='text-white'>


      {

        movieListNames.map((item, index) => <MovieList key={index} title={movieListNames[index]} movieList={movieListObject[index]} />)


      }


    </div>
  )
}

export default GptMovieSugesstions
