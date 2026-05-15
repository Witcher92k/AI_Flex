import React from 'react'

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGpt } from '../utils/gptSlice';


const Header = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userLoginState = useSelector(store => store.user)

  const gptToggle = useSelector(store => store.gpt.showGpt);



  const toggleGptFunc = () => {


    dispatch(toggleGpt());



  }


  useEffect(() => {


    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user

        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate('/browse');


        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate('/');

      }
    });

    // called when component is unmounted

    return () => unsubscribe();

  },
    [])



  const signOutFromAPP = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  }


  return (
    <div className='w-full absolute z-20 px-8 py-2 bg-gradient-to-b from-black to-transparent flex justify-between'>
      <img className='w-44' src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-04-27/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='no' />


      {userLoginState &&
        <div className='flex items-center gap-4'>
          <button
            onClick={toggleGptFunc}
            className='text-white text-sm font-medium px-4 py-1.5 border border-white rounded hover:bg-white hover:text-black transition-colors cursor-pointer flex items-center gap-2'
          >

            {!gptToggle && <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
              <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z" />
              <path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5L5 17z" />
            </svg>

            }
            {!gptToggle ? 'GPT Search' : 'Home'}
          </button>
          <img
            className='w-8 h-8 rounded'
            src='https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg'
            alt='profile'
          />
          <button
            className='text-white text-sm font-medium hover:text-gray-300 transition-colors cursor-pointer'
            onClick={signOutFromAPP}
          >
            Sign Out
          </button>
        </div>
      }

    </div>

  )
}

export default Header;