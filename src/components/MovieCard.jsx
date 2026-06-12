import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { IMG_CDN } from '../utils/constants';
import { addToMyList, removeFromMyList } from '../utils/myListSlice';

const MovieCard = ({ id, poster_path, title, vote_average }) => {
    const navigate  = useNavigate();
    const dispatch  = useDispatch();
    const myList    = useSelector(store => store.myList.items);
    const isInList  = myList.some(m => m.id === id);

    if (!poster_path) return null;

    const handleListToggle = (e) => {
        e.stopPropagation();
        if (isInList) {
            dispatch(removeFromMyList(id));
        } else {
            dispatch(addToMyList({ id, poster_path, title }));
        }
    };

    return (
        <div
            onClick={() => navigate(`/movie/${id}`)}
            className="relative w-36 aspect-[2/3] shrink-0 rounded overflow-hidden cursor-pointer group transition-transform duration-200 hover:scale-105 hover:z-10"
        >
            <img
                className="w-full h-full object-cover block"
                src={IMG_CDN + poster_path}
                alt={title || 'Movie poster'}
                loading="lazy"
            />

            {/* hover overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-2">
                {title && (
                    <p className="text-white text-xs font-semibold leading-tight line-clamp-2 drop-shadow">
                        {title}
                    </p>
                )}
                {vote_average > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                        <svg className="w-3 h-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-yellow-400 text-xs font-medium">{vote_average.toFixed(1)}</span>
                    </div>
                )}
            </div>

            {/* My List toggle — top-right corner */}
            <button
                onClick={handleListToggle}
                title={isInList ? 'Remove from My List' : 'Add to My List'}
                className={`absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 border ${
                    isInList
                        ? 'bg-[#E50914] border-[#E50914]'
                        : 'bg-black/60 border-white/40 hover:bg-[#E50914] hover:border-[#E50914]'
                }`}
            >
                {isInList ? (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default MovieCard;
