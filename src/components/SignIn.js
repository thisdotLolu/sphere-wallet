import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../firebase'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { FaArrowLeft } from 'react-icons/fa';
import Progress from './Progress';

const SignIn = () => {
    const address = localStorage.getItem('sphalletAddress');
    const[password,setPassword] =  useState('')
    const navigate  = useNavigate()
    const[loading,setLoading] = useState(false)

    const signIn = () =>{
        setLoading(true)
        signInWithEmailAndPassword(auth,`${address}@sphere.com`,password)
        .then((userCredential)=>{
            console.log(userCredential)
            setLoading(false)
            navigate('/wallet-view')
        }).catch((error)=>{
            setLoading(false)
            console.log(error)
            toast.error('error')
        })
    }

  return (
    <>
    {loading && <Loading/>}
    <div className='sign-in'>


        <FaArrowLeft
        style={{cursor:'pointer'}}
        onClick={()=>navigate(-1)}
        />

<h2>Welcome back, Enter your password</h2>

<input
type='password'
placeholder='Password'
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>


<button
onClick={signIn}
>Sign in</button>



</div>
    </>
    
  )
}

export default SignIn