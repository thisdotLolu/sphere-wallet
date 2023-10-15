import React, { useContext, useState, useEffect } from 'react'
import { CHAINS_CONFIG } from '../chains'
import { WalletContext } from '../context/WalletContext'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import toast from 'react-hot-toast'
import Loading from './Loading'
import { Tooltip } from 'antd'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'



const Send = () => {
    const {selectedChain,setSelectedChain,seedPhrase,setSeedPhrase} = useContext(WalletContext)
    const [recipientAddress,setRecipientAddress] = useState('')
    const [amount,setAmount] = useState('')
    const [processing,setProcessing] = useState(false)
    const [hash,setHash] = useState(null)
    const navigate = useNavigate()

    console.log(seedPhrase)

    const fetchData=async()=>{
        const querySnapshot = await getDocs(collection(db,'seedPhrase'))
        querySnapshot.forEach((doc)=>{
            console.log(doc.data())
        })
    }


    useEffect(()=>{

    },[])


    const sendTransaction =async(to, amount)=>{

        const chain = CHAINS_CONFIG[selectedChain]

        const provider = new ethers.JsonRpcApiProvider(chain.rpcUrl);

        const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;

        const wallet = new ethers.Wallet(privateKey, provider);

        const tx = {
            to:to,
            value:ethers.parseEther(amount.toString())
        }
        setProcessing(true)
        try{
            const transaction = await wallet.sendTransaction(tx)
            setHash(transaction.hash)
            const receipt = await transaction.wait()
            setHash(null)
            setProcessing(false)
            setAmount('')
            setRecipientAddress('')

            if(receipt.status === 1){
                navigate('/wallet-view')
            }else{
                console.log('failed')
            }
        }catch(err){
            setHash(null)
            setProcessing(false)
            setAmount('')
            setRecipientAddress('')
            toast.error('an error occured')
        }
    }


  return (
    <>
    {processing && <Loading/>}
    <div className='send-token'>
         <FaArrowLeft
        onClick={()=>navigate(-1)}
        className='arrowBack'
        />
        <h1>Transfer</h1>
        <label>
        Sending To :
        <input
        type='text'
        value={recipientAddress}
        onChange={(e)=>setRecipientAddress(e.target.value)}
        placeholder='Enter public address (0x)'
        />
        {(recipientAddress.length < 42 || recipientAddress.length > 42 || recipientAddress.slice(0,2)!=='0x') && <p style={{fontSize:'.6rem',color:'red'}}>invalid address</p>}
        </label>
        

        <label>
        Amount:
        <input
        type='text'
        placeholder='amount you want to send'
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
        />
        </label>

        <button
        disabled={(recipientAddress.length < 42 || recipientAddress.length > 42 || recipientAddress.slice(0,2)!=='0x')}
        >Send</button>

{hash && (
        <Tooltip title={hash}>
        <p>hover for transaction hash</p>
    </Tooltip>
)}
    
    </div>
    </>
    
  )
}

export default Send