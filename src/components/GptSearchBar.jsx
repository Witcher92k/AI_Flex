import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addGptMovies } from '../utils/gptSlice';
import callGemini from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';

const SUGGESTION_CHIPS = [
  'Mind-bending sci-fi',
  'Feel-good comedy',
  'Edge-of-seat thriller',
  'Classic horror',
];

const DEBOUNCE_MS = 700;
const MIN_QUERY_LEN = 3;

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceRef = useRef(null);
  const abortRef = useRef(null);

  const searchMovie = async (movieName, signal) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&include_adult=false&language=en-US&page=1`,
      { ...API_OPTIONS, signal }
    );
    const result = await data.json();
    return result.results;
  };

  const runSearch = async (q) => {
    if (!q?.trim()) return;

    // Cancel any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const { signal } = controller;

    setLoading(true);
    setError(null);
    let cancelled = false;
    try {
      const prompt = `You are a movie recommendation engine. Based on the query: "${q}", suggest exactly 5 movies. Return ONLY a comma-separated list of movie names with no extra text, numbering, or explanation. Example: Inception,Interstellar,The Matrix,Tenet,Arrival`;
      const result = await callGemini(prompt, signal);
      const movieNames = result.split(',').map(s => s.trim()).filter(Boolean);
      const MovieObject = await Promise.all(movieNames.map(name => searchMovie(name, signal)));
      dispatch(addGptMovies({ movieNames, MovieObject }));
    } catch (e) {
      if (e.name === 'AbortError') { cancelled = true; return; }
      console.error(e);
      setError('Something went wrong. Please try again.');
    } finally {
      if (!cancelled) setLoading(false);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    // Only debounce-search once the query is meaningful
    if (val.trim().length < MIN_QUERY_LEN) return;
    debounceRef.current = setTimeout(() => runSearch(val.trim()), DEBOUNCE_MS);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(debounceRef.current);
    runSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    setError(null);
    setLoading(false);
    clearTimeout(debounceRef.current);
    abortRef.current?.abort();
    dispatch(addGptMovies({ movieNames: null, MovieObject: null }));
  };

  const fillAndSearch = (text) => {
    setQuery(text);
    clearTimeout(debounceRef.current);
    runSearch(text);
  };

  return (
    <div className="w-full max-w-2xl px-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-white rounded-full overflow-hidden shadow-2xl ring-2 ring-transparent focus-within:ring-[#E50914]/50 transition-all duration-200"
      >
        <input
          value={query}
          onChange={handleChange}
          className="flex-1 px-6 py-4 text-black text-sm outline-none bg-transparent placeholder-gray-400"
          placeholder="e.g. mind-bending sci-fi with a twist ending..."
          type="text"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="px-3 text-gray-400 hover:text-gray-700 text-lg leading-none"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="flex items-center gap-2 bg-[#E50914] hover:bg-[#f40612] text-white font-bold px-7 py-4 text-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex-shrink-0"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Searching...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
              Search
            </>
          )}
        </button>
      </form>

      {error && (
        <p className="text-red-400 text-xs text-center mt-3">{error}</p>
      )}

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {SUGGESTION_CHIPS.map(chip => (
          <button
            key={chip}
            onClick={() => fillAndSearch(chip)}
            className="text-zinc-400 text-xs border border-zinc-600 rounded-full px-3 py-1.5 hover:border-white hover:text-white transition-all duration-150"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GptSearchBar;
