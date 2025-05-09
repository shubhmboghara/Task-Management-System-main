import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Signup = () => {

  const { signup } = useAuth()

  const [email, setEmail] = useState('')
  const [mobileNumber, setmobileNumber] = useState("")
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState()
  const [name, setName] = useState("")

  const [username, setUsername] = useState("")
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()
  const [gender, setGender] = useState("")
  const [role, setRole] = useState("")

  const handleMobileChange = (e) => {
    const value = e.target.value

    if (/^\d{0,10}$/.test(value)) {
      setmobileNumber(value)
      setErrorMessage('')
    } else {
      setErrorMessage('Please enter a valid 10-digit mobile number');
    }
  }

  const hanlesignup = e => {
    e.preventDefault()

    if (password !== confirmpassword) {
      setErrorMessage('Passwords do not match');
      return

    } if (mobileNumber.length !== 10 || mobileNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return
    }
    if (
      !username.trim() ||
      !name.trim() ||
      !email.trim() ||
      !mobileNumber.trim() ||
      !password.trim() ||
      !confirmpassword.trim() ||
      !gender.trim() ||
      !role.trim()
    ) {
      setErrorMessage('Please fill out all fields.');
      return;
    }
    else {
      setErrorMessage("")
    }

    signup(
      email,
      mobileNumber,
      password,
      username,
      name,
      navigate,
      gender,
      role
    );

  }
  return (


    <div className='bg-[#f3f3f9]  w-full min-h-screen items-center flex justify-center text-white   '

    >

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5  rounded-xl h-7600px] w-full max-w-sm shadow-lg bg-[#FFFFFF]  text-black"
        style={{
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.5)',
        }}>

        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={hanlesignup} className="flex flex-col space-y-4">

          <input
            type='text'
            placeholder='Username'
            className="border border-gray-300 px-4 py-2 rounded-md"
            onChange={(e) => setUsername(e.target.value)}
            required
            value={username}
          />

          <input
            type='text'
            placeholder='Name'
            className="border border-gray-300 px-4 py-2 rounded-md"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />

          <select name="Gender" id=""
            className="border border-gray-300 px-4 py-2 rounded-md"
            onChange={(e) => setGender(e.target.value)}
            value={gender} required
          >
            <option value="" className='text-black'>Gender</option>
            <option value="Male" className='text-black'>Male </option>
            <option value="Female" className='text-black' >Female </option>

          </select>

          <select onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md"
            value={role} required
          >
            <option value="" className='text-black'>Select Role</option>
            <option value="frontend" className='text-black'>Frontend Developer</option>
            <option value="backend" className='text-black'>Backend Developer</option>
            <option value="tester" className='text-black'>Tester</option>
            <option value="debugger" className='text-black'>Debugger</option>
            <option value="devops" className='text-black'>DevOps Engineer</option>
            <option value="Full stack developer" className='text-black'>Full stack developer</option>

          </select>



          <input
            type="email"
            placeholder="example@gmill.com"
            className="border border-gray-300 px-4 py-2 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            className="border border-gray-300 px-4 py-2 rounded-md"
            onChange={handleMobileChange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 px-4 py-2 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <input
            type='Password'
            placeholder='confirm Password'
            className="border border-gray-300 px-4 py-2 rounded-md"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmpassword}
            required
          />


          {errorMessage && (
            <div className="text-red-500 text-sm text-center">{errorMessage}</div>
          )}


          <button
            type="submit"
            className=" hover:bg-blue-700   bg-blue-600 
                        text-white py-2 px-5 rounded-md  transition "
          >
            Signup
          </button>
          <p className=' text-center text-black'>
            Already have an account?  {""}

            <Link to="/Login" className=' text-blue-500 hover:underline'>
              Login

            </Link>
          </p>

        </form>


      </div>

    </div >

  )

}

export default Signup


