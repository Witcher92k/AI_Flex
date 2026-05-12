import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router';
import Browse from './Browse';
import Login from './Login';
import Header from './Header';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';



const Body = () => {

    const dispatch = useDispatch();


 

    const appRouter = createBrowserRouter([

        {
            path: "/",
            element: <Login />

        },

        {

            path: '/browse',
            element: <Browse />

        }


    ])

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body