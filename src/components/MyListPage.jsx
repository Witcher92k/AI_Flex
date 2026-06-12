import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Header from './Header';
import { IMG_CDN } from '../utils/constants';
import { removeFromMyList } from '../utils/myListSlice';

const MyListPage = () => {
    const { items } = useSelector(store => store.myList);
    const dispatch  = useDispatch();
    const navigate  = useNavigate();

    return (
        <div className="bg-black min-h-screen text-white">
            <Header />

            <div className="pt-28 px-16 pb-20">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-1 h-8 bg-[#E50914] rounded-full" />
                    <h1 className="text-3xl font-black tracking-tight">My List</h1>
                    {items.length > 0 && (
                        <span className="text-zinc-500 text-sm font-normal">{items.length} title{items.length !== 1 ? 's' : ''}</span>
                    )}
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-5">
                            <svg className="w-9 h-9 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h2 className="text-white text-xl font-bold mb-2">Your list is empty</h2>
                        <p className="text-zinc-500 text-sm mb-6 max-w-xs">
                            Browse movies and click the <span className="text-white">+</span> button on any card to save it here
                        </p>
                        <button
                            onClick={() => navigate('/browse')}
                            className="bg-white text-black font-bold px-6 py-2.5 rounded hover:bg-white/90 transition-colors text-sm"
                        >
                            Browse Content
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                        {items.map(movie => (
                            <div
                                key={movie.id}
                                className="relative aspect-[2/3] rounded overflow-hidden cursor-pointer group"
                                onClick={() => navigate(`/movie/${movie.id}`)}
                            >
                                <img
                                    src={IMG_CDN + movie.poster_path}
                                    alt={movie.title}
                                    className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-200"
                                    loading="lazy"
                                />
                                {/* remove button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); dispatch(removeFromMyList(movie.id)); }}
                                    className="absolute top-2 right-2 w-7 h-7 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#E50914]"
                                    title="Remove from My List"
                                >
                                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                {/* title on hover */}
                                <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white text-xs font-semibold line-clamp-2">{movie.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyListPage;
