import { createSlice } from "@reduxjs/toolkit"
const movieSlice = createSlice({

    name:"movies",
    initialState:{
        nowPlaying:null,
        movieTrailer:null
    },
    reducers:{

        addMovies:(state,action)=>{
            state.nowPlaying = action.payload;
        },

        addMovieTrailer:(state,action)=>{
            state.movieTrailer=action.payload;
        }
      


    }








})

export const {addMovies,removeMovie,addMovieTrailer} = movieSlice.actions;

export default movieSlice.reducer;