import { createSlice } from "@reduxjs/toolkit"

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlaying: null,
        trending: null,
        popular: null,
        topRated: null,
        upcoming: null,
        movieTrailer: null,
    },
    reducers: {
        addMovies: (state, action) => {
            state.nowPlaying = action.payload;
        },
        addTrending: (state, action) => {
            state.trending = action.payload;
        },
        addPopular: (state, action) => {
            state.popular = action.payload;
        },
        addTopRated: (state, action) => {
            state.topRated = action.payload;
        },
        addUpcoming: (state, action) => {
            state.upcoming = action.payload;
        },
        addMovieTrailer: (state, action) => {
            state.movieTrailer = action.payload;
        },
    },
});

export const {
    addMovies,
    addTrending,
    addPopular,
    addTopRated,
    addUpcoming,
    addMovieTrailer,
} = movieSlice.actions;

export default movieSlice.reducer;
