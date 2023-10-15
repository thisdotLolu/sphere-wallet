import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3'
import Loading from './Loading';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';

const ABI = [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint8",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];


const TokenAdder = () => {
    const [token,setToken] = useState(null)
    const [address,setAddress] = useState('')
    const[loading,setLoading] = useState(false)


    const getToken = async()=>{
        setLoading(true)
        try{
            const web3 = new Web3('https://ethereum.publicnode.com')
            const contract = new web3.eth.Contract(ABI, address)

            const [name, symbol, decimals] = await Promise.all([
                contract.methods.name().call(),
                contract.methods.symbol().call(),
                contract.methods.decimals().call()
            ])
            setLoading(false)
            setToken({name,symbol,decimals}) 
            console.log(name,symbol, decimals)
        }
        catch(err){
            setLoading(false)
            toast.error('An error occured')
            console.log(err)

        }
    }

    // useEffect(()=>{
    //     getToken()
    // },[])

    const addToken=async()=>{
        try{
        const wasAdded = await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20', 
              options: {
                address: token.address, 
                symbol: token.symbol, 
                decimals: token.decimals
              },
            },
          });
          if (wasAdded) {
            toast.error('Token Added Successfully');
          } else {
            console.log('You might need an ethereum provider e.g install metamask ');
          }
        }
          catch(err){
            console.log(err)
            toast.error('You might need an ethereum provider e.g. install metamask')
          }
    }
    const navigate = useNavigate()
  return (
    <>
    {loading && <Loading/>}
    <div className='add-token'>
        <FaArrowLeft
        onClick={()=>navigate(-1)}
        className='arrowBack'
        />
        <h2>Import Token</h2>
        
        <label>
        Token contract address:
        {(address.length < 42 || address.length > 42 || address.slice(0,2)!=='0x') && <p style={{fontSize:'.6rem',color:'red'}}>invalid address</p>}
        <input
        type='text'
        value={address}
        onChange={(e)=>setAddress(e.target.value)}
        />
        
        </label>
        
        <button
        disabled={(address.length < 42 || address.length > 42 || address.slice(0,2)!=='0x')}
        onClick={getToken}
        >Detect Token</button>

        <div className='token-added-details'>
            {
                token && token?.name && token?.symbol &&
                <>
                <h3>Token details</h3>
                <h4>Token name: {token.name}</h4>
                <h4>Token symbol: {token.symbol}</h4>
                </>
            }
        </div>


        <button
        onClick={getToken}
        >Add Token</button>
    </div>
    
    </>
    
  )
}

export default TokenAdder