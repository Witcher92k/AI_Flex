import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({

    name: "gpt",
    initialState: {
        showGpt: false,
        gptSuggestedMovieList:null,
        movieNameList:null
    },
    reducers: {
        toggleGpt: (state) => {
            state.showGpt = !state.showGpt
        },
        addGptMovies:(state,action)=>{

            const {movieNames,MovieObject}=action.payload;
            state.gptSuggestedMovieList = MovieObject
            state.movieNameList =movieNames


        }


    }








})


export const { toggleGpt,addGptMovies } = gptSlice.actions;

export default gptSlice.reducer;
