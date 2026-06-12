import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSugesstions = () => {
  const movieListNames = useSelector(store => store.gpt.movieNameList);
  const movieListObject = useSelector(store => store.gpt.gptSuggestedMovieList);

  if (!movieListNames) return null;

  return (
    <div className="px-12 pb-16">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-6 rounded-full" style={{ backgroundColor: '#E50914' }} />
        <h2 className="text-white text-xl font-bold tracking-tight">AI Recommendations</h2>
        <span className="text-zinc-500 text-sm">— {movieListNames.length} categories found</span>
      </div>

      {movieListNames.map((name, index) => (
        movieListObject[index]?.length > 0 && (
          <MovieList
            key={index}
            title={name}
            movieList={movieListObject[index]}
          />
        )
      ))}
    </div>
  );
};

export default GptMovieSugesstions;
