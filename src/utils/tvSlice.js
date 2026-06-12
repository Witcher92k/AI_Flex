import { createSlice } from "@reduxjs/toolkit";

const tvSlice = createSlice({
    name: "tv",
    initialState: {
        onAir: null,
        popularTv: null,
        topRatedTv: null,
        airingToday: null,
        trendingTv: null,
    },
    reducers: {
        addOnAir:       (state, action) => { state.onAir       = action.payload; },
        addPopularTv:   (state, action) => { state.popularTv   = action.payload; },
        addTopRatedTv:  (state, action) => { state.topRatedTv  = action.payload; },
        addAiringToday: (state, action) => { state.airingToday = action.payload; },
        addTrendingTv:  (state, action) => { state.trendingTv  = action.payload; },
    },
});

export const { addOnAir, addPopularTv, addTopRatedTv, addAiringToday, addTrendingTv } = tvSlice.actions;
export default tvSlice.reducer;
