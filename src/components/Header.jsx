import { useEffect, useState } from 'react'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGpt } from '../utils/gptSlice';

const NAV_LINKS = [
    { label: 'Home',          path: '/browse'           },
    { label: 'TV Shows',      path: '/browse/tv-shows'  },
    { label: 'Movies',        path: '/browse/movies'    },
    { label: 'New & Popular', path: '/browse/new-popular'},
    { label: 'My List',       path: '/browse/my-list'   },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userLoginState = useSelector(store => store.user);
  const gptToggle = useSelector(store => store.gpt.showGpt);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        // only redirect on the login page — don't interrupt movie/browse navigation
        if (location.pathname === '/') navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, []);

  const signOutFromAPP = () => {
    signOut(auth)
      .then(() => navigate('/'))
      .catch(console.error);
  };

  return (
    <header
      className={`w-full fixed z-50 px-8 py-3 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
      }`}
    >
      {/* Left — logo + nav */}
      <div className="flex items-center gap-8">
        <img
          className="w-28 cursor-pointer flex-shrink-0"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-04-27/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix"
          onClick={() => navigate('/browse')}
        />
        {userLoginState && !gptToggle && (
          <nav className="hidden lg:flex items-center gap-5">
            {NAV_LINKS.map(({ label, path }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`text-sm transition-colors ${
                    isActive ? 'text-white font-semibold underline underline-offset-4 decoration-[#E50914]' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Right — GPT toggle + profile */}
      {userLoginState && (
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              dispatch(toggleGpt());
              if (location.pathname !== '/browse') navigate('/browse');
            }}
            className={`flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded transition-all ${
              gptToggle
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-[#E50914] text-white hover:bg-[#f40612]'
            }`}
          >
            {!gptToggle && (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
                <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z" />
              </svg>
            )}
            {gptToggle ? '← Home' : 'GPT Search'}
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-white/20">
            <div className="text-right hidden sm:block">
              <p className="text-white text-sm font-medium leading-tight">
                {userLoginState.displayName || 'User'}
              </p>
              <p className="text-zinc-400 text-xs leading-tight truncate max-w-[140px]">
                {userLoginState.email}
              </p>
            </div>
            <img
              className="w-8 h-8 rounded cursor-pointer ring-2 ring-transparent hover:ring-white/60 transition-all"
              src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
              alt="profile"
            />
            <button
              onClick={signOutFromAPP}
              className="text-zinc-400 text-sm hover:text-white transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
