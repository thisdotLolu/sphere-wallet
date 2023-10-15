import React, { useContext, useEffect, useState } from "react";
import Progress from "./Progress";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "../context/WalletContext";
import { ethers } from "ethers";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth, db} from '../firebase'
import Modal from "./Modal";
import Loading from "./Loading";
import { doc, setDoc } from "firebase/firestore";

function CreateAccount() {
  const{wallet,setWallet,setSeedPhrase,seedPhrase} = useContext(WalletContext);
  const navigate = useNavigate();
  const[password, setPassword] = useState('')
  const[confirmPassword, setConfirmpassword] = useState('')
  const[loading,setLoading] = useState(false)

  function setWalletAndMnemonic(){
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setSeedPhrase(mnemonic)
    setWallet(ethers.Wallet.fromPhrase(mnemonic).address) 
  }

  useEffect(()=>{
    if(wallet !== ''){
      localStorage.setItem('sphalletAddress', wallet);
    }
  },[wallet])

  useEffect(()=>{
    setWalletAndMnemonic()
  },[])


  const signUp=async()=>{
    setLoading(true)
    console.log(wallet)
    const mockMail = `${wallet}@sphere.com` 
    createUserWithEmailAndPassword(auth,mockMail,password)
    .then(async(userCredential)=>{
      console.log(userCredential)
      await setDoc(doc(db, 'mnemonics',userCredential.user.uid),{
        seedPhrase
      })
      setLoading(false)

      navigate('/back-up')

    })
    .catch((error)=>{
      setLoading(false)
      console.log(error)
    })
  }

  
  
 
  return (
    <>
    {loading && <Loading/>}
      
      <div className="content create-account">
        <Progress
        number='2'
        />
        <h3>Create a password</h3>

        <h4>you will use this to unlock your wallet.</h4>

        <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />

        <input
        type='password'
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e)=>setConfirmpassword(e.target.value)}
        />
        {confirmPassword !== password && <p className='passwordError'>password is not the same</p>}

        <div className='agree'>
        <input
        type="checkbox"
        /> <p>Agree to the terms of services</p>
        </div>
        


        <button
        disabled={password === '' || confirmPassword !== password}
        onClick={signUp}
        >Continue</button>
      </div>
    </>
  );
}

export default CreateAccount;
