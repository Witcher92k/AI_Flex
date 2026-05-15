import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSugesstions from './GptMovieSugesstions'

const GPTsearch = () => {
  return (
    <div className='min-h-screen bg-black'>
        <div className='flex justify-center pt-40'>
            <GptSearchBar />
        </div>
        <GptMovieSugesstions />
    </div>
  )
}

export default GPTsearch