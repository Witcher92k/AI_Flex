import React from 'react'

const VideoTitle = ({ overview, title }) => {
    return (
        <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10'>
            <div className='absolute bottom-1/4 px-16 text-white w-1/2'>
                <h1 className='text-5xl font-extrabold mb-4'>{title}</h1>
                <p className='text-lg w-96 mb-6'>{overview}</p>

                <div className='flex gap-4'>
                    <button className='flex items-center gap-2 px-8 py-3 !bg-white !text-black font-bold text-lg rounded hover:!bg-gray-200'>
                        &#9658; Play
                    </button>
                    <button className='flex items-center gap-2 px-8 py-3 bg-gray-600 bg-opacity-70 text-white font-bold text-lg rounded hover:bg-opacity-50'>
                        ⓘ More Info
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VideoTitle