import React, { useEffect } from 'react'
import Header from './Header'
import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addMovies } from '../utils/movieSlice'
import useNowPlayingList from '../customHooks/useNowPlayingList';
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import GPTsearch from './GPTsearch'
import callMovieSuggestion from '../utils/openai'


const Browse = () => {


  //  useEffect(()=>{
  //   callMovieSuggestion();        
  // },[])


  const gptToggle = useSelector(store => store.gpt.showGpt)


  useNowPlayingList();

 
  return (
    <div>
      <Header></Header>
      {gptToggle ? <GPTsearch /> : ( <><MainContainer /><SecondaryContainer /></>)
      }
    </div>
  )
}

export default Browse
