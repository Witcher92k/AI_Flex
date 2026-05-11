import React from 'react'

import { getAuth, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';


const Header = () => {

  const navigate = useNavigate();

  const signOutFromAPP = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out successfully");
        navigate('/');
      })
      .catch((error) => {
        // An error happened during sign-out.
        console.error("Sign out error:", error);
      });



  }


  return (
    <div className='w-full absolute z-10 px-8 py-2 bg-gradient-to-b from-black to-transparent flex justify-between'>
      <img className='w-44' src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-04-27/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='no' />

      <div className= 'flex'>
        <div>
          <img className='w-20 mx-2'  src='https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg'></img>
        </div>
        <button className=' text-red-600' onClick={signOutFromAPP}>Sign Out</button>    
      </div>

    </div>

  )
}

export default Header;