import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {

const data = useSelector((store)=>store.movies?.nowPlaying);

if(!data){
    return ;
}

const mainMovie = data[0];

const {original_title,overview,id} = mainMovie;


  return (
    <div className='relative h-screen overflow-hidden isolate'>
        <VideoTitle title={original_title} overview={overview} />
        <VideoBackground id={id}></VideoBackground>
    </div>
  )
}

export default MainContainer