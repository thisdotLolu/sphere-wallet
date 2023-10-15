import React, { useContext, useEffect, useState } from 'react'
// import Moralis from 'moralis'
import { WalletContext } from '../context/WalletContext';
import axios from 'axios';
import toast from 'react-hot-toast';
// import Moralis from 'moralis';
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Swap = () => {
    const address = localStorage.getItem('sphalletAddress');  
    const[loading,setLoading] = useState(false)
    const [balance,setBalance] = useState(0)

    const {selectedChain} = useContext(WalletContext)

    const [fromToken] = useState("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE");
  const [toToken, setToToken] = useState(
    "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
  ); //USDC ERC20 Contract
  const [value, setValue] = useState("1000000000000000000");
  const [valueExchanged, setValueExchanged] = useState("");
  const [valueExchangedDecimals, setValueExchangedDecimals] = useState(1e18);
  const [to, setTo] = useState("");
  const [txData, setTxData] = useState("");
    const navigate = useNavigate()

    async function getAccountTokens(){
        setLoading(true)
        try{
          const res = await axios.get('http://localhost:3001/getTokens',{
          params:{
            userAddress: address,
            chain: selectedChain
          },
        })
        const response = res.data
        console.log(response)
    
        
        setBalance(response.balance)
        setLoading(false)
        }catch(err){
          setLoading(false)
          toast.error('error fetching wallet data')
        }
      }
    

      useEffect(()=>{
        getAccountTokens()
      },[])


      function changeToToken(e){
        setToToken(e.target.value);
        setValueExchanged('')
      }

      function changeValue(e){
        setValue(e.target.value * 1E18);
        setValueExchanged('')
      }

    //   https://api.1inch.dev/swap/v5.2/1/swap?src=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&dst=0x111111111117dc0aa78b770fa6a738034120c302&amount=10000000000000000&from=0x9B7c1F57397ba39d3A1B042BF9325841f202D439&slippage=1

    console.log(`https://api.1inch.dev/swap/v5.2/1/swap?src=${fromToken}&dst=${toToken}&amount=${value}&from=${address}&slippage=1`)

    const get1inchSwap=async()=>{
        const tx = await axios.get(`swap/v5.2/1/swap?src=${fromToken}&dst=${toToken}&amount=${value}&from=${address}&slippage=1`
        ,{
            headers:{
                Authorization:`Bearer ${process.env.REACT_APP_1INCH_KEY}`
            }
        }
        )
        
        console.log(tx.data)
        setTo(tx.data.tx.to)
        setTxData(tx.data.tx.data)
        setValueExchangedDecimals(Number(`1E${tx.data.toToken.decimals}`))
        setValueExchanged(tx.data.toTokenAmount);
    }
    return (
    
    <div className='swap'>
        
        <FaArrowLeft
        onClick={()=>navigate(-1)}
        className='arrowBack'
        />
         <select>
        <option value="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE">
          MATIC
        </option>
      </select>
      <input
        onChange={(e) => changeValue(e)}
        value={value / 1e18}
        type="number"
        min={0}
        max={balance.balance / 1e18}
      ></input>
      <br />
      <br />
      <select name="toToken" value={toToken}
      onChange={(e) => changeToToken(e)}
      > 
        <option value="0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619">WETH</option>
        <option value="0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174">USDC</option>
      </select>
      <input
        value={
          !valueExchanged
            ? ""
            : (valueExchanged / valueExchangedDecimals).toFixed(5)
        }
        disabled={true}
      ></input>
      <br />
      <br />
      <button onClick={get1inchSwap}>Get Conversion</button>
      {/* 
      <button disabled={!valueExchanged} onClick={sendTransaction}>Swap Tokens</button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>} */}
      <br />
      <br />
      
    </div>
  )
}

export default Swap