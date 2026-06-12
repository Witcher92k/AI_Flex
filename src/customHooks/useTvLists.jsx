import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addOnAir, addPopularTv, addTopRatedTv, addAiringToday, addTrendingTv } from "../utils/tvSlice";

const TV_ENDPOINTS = [
    { url: "https://api.themoviedb.org/3/tv/on_the_air?page=1",  action: addOnAir       },
    { url: "https://api.themoviedb.org/3/tv/popular?page=1",      action: addPopularTv   },
    { url: "https://api.themoviedb.org/3/tv/top_rated?page=1",    action: addTopRatedTv  },
    { url: "https://api.themoviedb.org/3/tv/airing_today?page=1", action: addAiringToday },
    { url: "https://api.themoviedb.org/3/trending/tv/week",       action: addTrendingTv  },
];

const useTvLists = () => {
    const dispatch = useDispatch();
    const alreadyLoaded = useSelector(store => store.tv.onAir);

    useEffect(() => {
        if (alreadyLoaded) return;
        const fetchAll = async () => {
            try {
                const results = await Promise.all(
                    TV_ENDPOINTS.map(({ url }) => fetch(url, API_OPTIONS).then(r => r.json()))
                );
                results.forEach((data, i) => dispatch(TV_ENDPOINTS[i].action(data.results)));
            } catch (e) {
                console.error("Failed to fetch TV lists:", e);
            }
        };
        fetchAll();
    }, []);
};

export default useTvLists;
