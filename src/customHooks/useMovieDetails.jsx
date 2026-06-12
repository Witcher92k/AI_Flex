import { useState, useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';

const useMovieDetails = (id) => {
    const [movie, setMovie]     = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast]       = useState([]);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);

        const fetchAll = async () => {
            try {
                const [details, credits, videos, similarRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/${id}`, API_OPTIONS).then(r => r.json()),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, API_OPTIONS).then(r => r.json()),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, API_OPTIONS).then(r => r.json()),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/similar`, API_OPTIONS).then(r => r.json()),
                ]);

                setMovie(details);
                setCast(credits.cast?.slice(0, 12) ?? []);
                setSimilar(similarRes.results ?? []);

                const vids = videos.results ?? [];
                const key = (
                    vids.find(v => v.type === 'Trailer' && v.site === 'YouTube') ||
                    vids.find(v => v.type === 'Teaser'  && v.site === 'YouTube') ||
                    vids.find(v => v.site === 'YouTube')
                )?.key ?? null;
                setTrailer(key);
            } catch (e) {
                console.error('Failed to fetch movie details:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [id]);

    return { movie, trailer, cast, similar, loading };
};

export default useMovieDetails;
