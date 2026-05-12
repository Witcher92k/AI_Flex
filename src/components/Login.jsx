import React, { useRef, useState } from 'react'
import Header from './Header'
import formValidationFun from '../utils/validation';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword ,updateProfile,getAuth} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice";
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const [loginType, setLoginType] = useState('login');

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);

  const password = useRef(null);

  
  const userName = useRef(null);




  const validateForm = () => {

    // const message = formValidationFun(email.current.value, password.current.value);


    if (loginType === 'signup') {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          console.log('User created:', userCredential.user);
         

          const user = userCredential.user;
      

          if (user) {
            updateProfile(user, {
              displayName: userName.current.value,
              photoURL: "https://example.com/jane-q-user/profile.jpg"
            }).then(() => {
               
            }).catch((error) => {
              setErrorMessage(error.message);
            });
          }

        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }

    if(loginType=='login') {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          console.log('Signed in:', userCredential.user);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }




  }


  return (
    <div>
      <Header></Header>

      <div>

        <img className='w-full' src='https://assets.nflxext.com/ffe/siteui/vlv3/76c5a455-c62c-46d4-8653-3924728113e3/web/IN-en-20260504-TRIFECTA-perspective_596176fe-3b1e-48ec-8a00-a0acb34e68f1_large.jpg' alt='bg-img' />

      </div>

      <form onSubmit={(e) => e.preventDefault()} className='absolute p-10 w-3/12 mx-auto left-0 right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-80'>
        <h1 className='font-bold text-3xl my-4'>{loginType == 'login' ? 'Sign In' : 'Sign Up'}</h1>

        {loginType == 'signup' &&

          <input ref={userName} className='p-2 my-2 w-full' placeholder='Full Name' type="text" />

        }

        <input ref={email} className='p-2 my-2 w-full' placeholder='email address' type="text" />

        <input ref={password} className='p-2 my-2 w-full' placeholder='password' type='password' />

        <p className='text-red-600 py-2'>{errorMessage}</p>

        <button onClick={validateForm} className='my-2 p-2 bg-red-700 w-full rounded-lg'>{loginType == 'login' ? 'Sign In' : 'Sign Up'}</button>



        {loginType == 'login' &&
          <p className='py-4 text-white my-2 cursor-pointer'><a onClick={() => {
            setLoginType('signup')
          }}> New to netfliex? Sign up now</a></p>

        }

        {loginType == 'signup' &&
          <p className='py-4 text-white my-2 cursor-pointer'><a onClick={() => {
            setLoginType('login')
          }}>- Back to Login</a></p>

        }


      </form>

    </div>




  )
}

export default Login