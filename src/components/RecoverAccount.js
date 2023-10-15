import { ethers } from "ethers";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";


function RecoverAccount() {

  const [phraseState,setPhraseState] = useState({
    one:'',
    two:'',
    three:'',
    four:'',
    five:'',
    six:'',
    seven:'',
    eight:'',
    nine:'',
    ten:'',
    eleven:'',
    twelve:'',
  })

  const[nonValid,setNonValid] = useState(false) 
  const navigate= useNavigate()
  const[loading,setLoading] = useState(false)
 
  const verifySeedPhrase=()=>{
    setLoading(true)
    const phrase = `${phraseState.one} ${phraseState.two} ${phraseState.three} ${phraseState.four} ${phraseState.five} ${phraseState.six} ${phraseState.seven} ${phraseState.eight} ${phraseState.nine} ${phraseState.ten} ${phraseState.eleven} ${phraseState.twelve}`
    console.log(phrase)
    let recoveredWallet
    try{
      recoveredWallet = ethers.Wallet.fromPhrase(phrase)
      // console.log(recoveredWallet)
      localStorage.setItem('sphalletAddress', recoveredWallet.address);
      setLoading(false)
    }
    catch(err){
      setNonValid(true)
      setLoading(false)
      toast.error('error')
      return;
    }
    navigate('/wallet-view')
  }

  const {one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve} = phraseState

  return (
    <>
    {loading && <Loading/>}
      <div className="content recover-account">
        <h1>Import / Recover Wallet</h1>
        <div className='top'>
          Type or copy/paste the seed phrase for your wallet.
        </div>

        <div className='inputs'>
        
        <label>
        1.<input
        type='text'
        value={phraseState.one}
        onChange={(e)=>setPhraseState((prev)=>({...prev,one:e.target.value}))}
        />
        </label>
        
        
        <label>
        2.<input
        type='text'
        value={phraseState.two}
        onChange={(e)=>setPhraseState((prev)=>({...prev,two:e.target.value}))}
        />
        </label>
        
        
        
        <label>
        3.<input
        type='text'
        value={phraseState.three}
        onChange={(e)=>setPhraseState((prev)=>({...prev,three:e.target.value}))}
        />
        </label>
        

        <label>
        4.<input
        type='text'
        value={phraseState.four}
        onChange={(e)=>setPhraseState((prev)=>({...prev,four:e.target.value}))}
        />
        </label>

        <label>
        5.<input
        type='text'
        value={phraseState.five}
        onChange={(e)=>setPhraseState((prev)=>({...prev,five:e.target.value}))}
        />
        </label>
        
        
        <label>
        6.<input
        type='text'
        value={phraseState.six}
        onChange={(e)=>setPhraseState((prev)=>({...prev,six:e.target.value}))}
        />
        </label>

        <label>
        7.<input
        type='text'
        value={phraseState.seven}
        onChange={(e)=>setPhraseState((prev)=>({...prev,seven:e.target.value}))}
        />
        </label>
        
        <label>
        8.<input
        type='text'
        value={phraseState.eight}
        onChange={(e)=>setPhraseState((prev)=>({...prev,eight:e.target.value}))}
        />
        </label>
        

        <label>
        9.<input
        type='text'
        value={phraseState.nine}
        onChange={(e)=>setPhraseState((prev)=>({...prev,nine:e.target.value}))}
        />
        </label>
        

        <label>
        10.<input
        type='text'
        value={phraseState.ten}
        onChange={(e)=>setPhraseState((prev)=>({...prev,ten:e.target.value}))}
        />
        </label>
        
        <label>
        11.<input
        type='text'
        value={phraseState.eleven}
        onChange={(e)=>setPhraseState((prev)=>({...prev,eleven:e.target.value}))}
        />
        </label>
        

        <label>
        12.<input
        type='text'
        value={phraseState.twelve}
        onChange={(e)=>setPhraseState((prev)=>({...prev,twelve:e.target.value}))}
        />
        </label>
        
        </div>
        {nonValid && <p
        style={{color:'red', fontSize:'.7rem'}}
        >Invalid Seed Phrase</p>}

        <button
        disabled={one === ''|| two==='' || three==='' || four===''||five===''||six===''|| seven===''|| eight===""|| nine===''|| ten===''|| eleven===''|| twelve===''}
        onClick={verifySeedPhrase}
        >Import</button>
      </div>
    </>
  );
}

export default RecoverAccount;
