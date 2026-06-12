import { configureStore } from "@reduxjs/toolkit";
import userReducer   from "./userSlice";
import movieReducer  from "./movieSlice";
import gptReducer    from "./gptSlice";
import tvReducer     from "./tvSlice";
import myListReducer from "./myListSlice";

const appStore = configureStore({
    reducer: {
        user:   userReducer,
        movies: movieReducer,
        gpt:    gptReducer,
        tv:     tvReducer,
        myList: myListReducer,
    },
});

export default appStore;
