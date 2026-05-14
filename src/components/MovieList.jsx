import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movieList }) => {
    return (
    <div>
        <h1 className='text-white text-2xl font-bold py-4'>{title}</h1>
        <div className='flex overflow-x-scroll no-scrollbar'>
            {movieList.map(item => <MovieCard key={item.id} poster_path={item.poster_path} />)}
        </div>
    </div>
    )
}

export default MovieList