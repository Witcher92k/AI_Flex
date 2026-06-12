import { createSlice } from "@reduxjs/toolkit";

const stored = JSON.parse(localStorage.getItem('nflx_mylist') || '[]');

const myListSlice = createSlice({
    name: "myList",
    initialState: { items: stored },
    reducers: {
        addToMyList: (state, action) => {
            if (!state.items.find(m => m.id === action.payload.id)) {
                state.items.push(action.payload);
                localStorage.setItem('nflx_mylist', JSON.stringify(state.items));
            }
        },
        removeFromMyList: (state, action) => {
            state.items = state.items.filter(m => m.id !== action.payload);
            localStorage.setItem('nflx_mylist', JSON.stringify(state.items));
        },
    },
});

export const { addToMyList, removeFromMyList } = myListSlice.actions;
export default myListSlice.reducer;
