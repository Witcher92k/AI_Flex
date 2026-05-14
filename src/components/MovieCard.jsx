import React from 'react'
import { IMG_CDN } from '../utils/constants'

const MovieCard = ({poster_path}) => {
  return (
    <div className='w-36 shrink-0'>
        <img className='w-full' src={IMG_CDN+poster_path} alt='hey'/>
    </div>
  )
}

export default MovieCard