import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Login = () => {

   const { Login } = useAuth()

   const [emailphone, setEmailphone] = useState('')

   const [password, setPassword] = useState('')
   const navigate = useNavigate()
   const [username, setUsername] = useState("")
   const [errormessage, setErrorMessage] = useState("")


   const hanleLogin = (e) => {
      e.preventDefault()
      const isEmail = /\S+@\S+\.\S+/.test(emailphone)
      const isPhone = /^[0-9]{10}$/.test(emailphone)

      if (!emailphone.trim() || !password.trim() || !username.trim()) {
         setErrorMessage('Please fill out all fields.');
         return;
      }
      else {
         setErrorMessage("")
      }

      if (!isEmail && !isPhone) {
         setErrorMessage('Enter a valid email address or phone number.');
         return
      }

      

      setErrorMessage("")
      Login(emailphone, password, username, navigate)

   }

   return (

      <div className='bg-[#f3f3f9]  w-full min-h-screen items-center flex justify-center text-black'>
         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5  rounded-xl  w-full max-w-sm shadow-lg bg-[#FFFFFF] "
            style={{
               boxShadow: '0 0 40px rgba(0, 0, 0, 0.5)',
            }}>
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

            <form onSubmit={hanleLogin} className="flex flex-col space-y-4">

               <input
                  type='text'
                  placeholder='Username'
                  className="border border-gray-300 px-4 py-2 rounded-md"
                  onChange={(e) => setUsername(e.target.value)}
                  required
               />

               <input
                  type="text"
                  placeholder="Email or phone number"
                  value={emailphone}
                  className="border border-gray-300 px-4 py-2 rounded-md"
                  onChange={(e) => setEmailphone(e.target.value)}
                  required
               />


               <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-300 px-4 py-2 rounded-md"
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
               {errormessage && (
                  <div className="text-red-500 text-center">{errormessage}</div>
               )}




               <button
                  type="submit"
                  className="hover:bg-blue-700    bg-blue-600 
                 text-white font-semibold py-2 px-6 rounded-md shadow-md  transition duration-300        ease-in-out"
               >
                  Login
               </button>

               <p className=' text-center'>
                  Don't have an account? {""}

                  <Link to="/signup" className=' text-blue-500 hover:underline'>
                     Register

                  </Link>
               </p>


            </form>


         </div>

      </div>
   )

}


export default Login