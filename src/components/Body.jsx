import { createBrowserRouter, RouterProvider } from 'react-router';
import Browse       from './Browse';
import Login        from './Login';
import MoviePage    from './MoviePage';
import TvShowsPage  from './TvShowsPage';
import MoviesPage   from './MoviesPage';
import NewPopularPage from './NewPopularPage';
import MyListPage   from './MyListPage';

const appRouter = createBrowserRouter([
    { path: '/',                   element: <Login />         },
    { path: '/browse',             element: <Browse />        },
    { path: '/browse/tv-shows',    element: <TvShowsPage />   },
    { path: '/browse/movies',      element: <MoviesPage />    },
    { path: '/browse/new-popular', element: <NewPopularPage />},
    { path: '/browse/my-list',     element: <MyListPage />    },
    { path: '/movie/:id',          element: <MoviePage />     },
]);

const Body = () => (
    <div>
        <RouterProvider router={appRouter} />
    </div>
);

export default Body;
