import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import {
    addMovies,
    addTrending,
    addPopular,
    addTopRated,
    addUpcoming,
} from "../utils/movieSlice";

const ENDPOINTS = [
    { url: "https://api.themoviedb.org/3/movie/now_playing?page=1",   action: addMovies    },
    { url: "https://api.themoviedb.org/3/trending/movie/week",        action: addTrending  },
    { url: "https://api.themoviedb.org/3/movie/popular?page=1",       action: addPopular   },
    { url: "https://api.themoviedb.org/3/movie/top_rated?page=1",     action: addTopRated  },
    { url: "https://api.themoviedb.org/3/movie/upcoming?page=1",      action: addUpcoming  },
];

const useMovieLists = () => {
    const dispatch = useDispatch();
    const alreadyLoaded = useSelector(store => store.movies.nowPlaying);

    useEffect(() => {
        if (alreadyLoaded) return; // avoid re-fetching on re-mounts

        const fetchAll = async () => {
            try {
                const results = await Promise.all(
                    ENDPOINTS.map(({ url }) => fetch(url, API_OPTIONS).then(r => r.json()))
                );
                results.forEach((data, i) => {
                    dispatch(ENDPOINTS[i].action(data.results));
                });
            } catch (e) {
                console.error("Failed to fetch movie lists:", e);
            }
        };

        fetchAll();
    }, []);
};

export default useMovieLists;
