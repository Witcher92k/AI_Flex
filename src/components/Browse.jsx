import React, { useEffect } from 'react'
import Header from './Header'
import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addMovies } from '../utils/movieSlice'
import useNowPlayingList from '../customHooks/useNowPlayingList';
import MainContainer from './MainContainer'

const Browse = () => {


  useNowPlayingList();

  return (
    <div>
      <Header></Header>
       <MainContainer/>
    </div>
  )
}

export default Browse
