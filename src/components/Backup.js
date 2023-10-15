import React, { useContext, useState } from 'react'
import Progress from './Progress'
import {FaCopy} from 'react-icons/fa'
import { WalletContext } from '../context/WalletContext'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Modal from './Modal'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Backup = () => {
    const {seedPhrase} = useContext(WalletContext);
    const[showModal,setShowModal] = useState(false)
    const navigate = useNavigate()

  return (
    <>
    {showModal && <Modal
    text='copied to clipboard'
    borderColor='green'
    bgColor='rgba(0,255,0,0.4)'
    />}
    <div className="content back-up">

      <Progress number="3" />

      <h3>Back up your wallet</h3>

      <p className='instruction'>
        Your secret recovery phrase is used to recover your crypto if you lose
        your computer or switch to a different wallet.
      </p>

      <p className='instruction'>
        Save these 12 words in a secure location, such as in a password manager.
      </p>

      <div className='seed-phrase-container'>
        {seedPhrase.replace(/\s/g, '-')}
      </div>

      
    <CopyToClipboard
    text={seedPhrase}
    >
        <div className='copy'
         onClick={()=>toast.success('copied to clipboard')}
        >
        <img
        src='/copy.png'
        alt='copy'
        />
    <p>Copy to clipboard</p>
    </div>
    </CopyToClipboard>


    <button

    onClick={()=>navigate('/wallet-view')}
    >
        Next
    </button>
    </div>
    </>
    
  );
}

export default Backup