import React, { useContext, useEffect, useState } from "react";
import { Avatar, List, Select, Tabs } from "antd";
import {FaArrowUp, FaCopy} from 'react-icons/fa'
import CopyToClipboard from "react-copy-to-clipboard";
import {AiOutlineSwap} from 'react-icons/ai'
import {BsCurrencyExchange} from 'react-icons/bs'
import {MdCallReceived} from 'react-icons/md' 
import toast from "react-hot-toast";
import TokenAdder from "./TokenAdder";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Loading from "./Loading";
import { WalletContext } from "../context/WalletContext";
import { CHAINS_CONFIG } from "../chains";


function WalletView() {

  const navigate = useNavigate()
  const [tokens, setTokens] = useState(null)
  const [balance,setBalance] = useState(0)
  const [loading,setLoading] = useState(false)
  const {selectedChain,setSelectedChain} = useContext(WalletContext)

  const items = [
    {
      key: "3",
      label: `Tokens`,
      children: (
        <div className='tokensList-container'>
        {
          tokens?
          (
            <>
            <button
            onClick={()=>navigate('/add-token')}
            style={{marginBottom:'10px'}}
            >
              Add Token
            </button>
        <List
        
        className="tokensList"
                  bordered
                  itemLayout="horizontal"
                  dataSource={tokens}
                  renderItem={(item, index) => (
                    <List.Item style={{ textAlign: "left" }}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.logo || ''} />}
                        title={item.symbol}
                        description={item.name}
                      />
                      <div>
                        {(
                          Number(item.balance) /
                          10 ** Number(item.decimals)
                        ).toFixed(2)}{" "}
                        Tokens
                      </div>
                    </List.Item>
                  )}
                />
            </>
          ):(
            <>
            <p>No tokens yet</p>
            
            </>
            
          )
        }
        </div>
      ),
    },
    {
      key: "2",
      label: `Transactions`,
      children: (
        <>
          Transactions
        </>
      ),
    }  ];

  

  const address = localStorage.getItem('sphalletAddress');  
  console.log(address)



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

    if(response.tokens.length > 0){
      setTokens(response.tokens)
      console.log(response.tokens)
    }
    
    setBalance(response.balance)
    setLoading(false)
    }catch(err){
      setLoading(false)
      toast.error('error fetching wallet data')
    }
  }

  useEffect(()=>{
    if(!address || !selectedChain) return;
    setTokens(null)
    setBalance(0)
    getAccountTokens()
  },[])

  useEffect(()=>{
    if(!address || !selectedChain) return;
    setTokens(null)
    setBalance(0)
    getAccountTokens()
  },[selectedChain])

  return (
    <>
    {loading && <Loading/> }
      <div className="wallet-view">
        <div className="chains">
          <img
          src='/sphereWelcome.png'
          alt='sphere'
          />
               
        <Select
          onChange={(val) => setSelectedChain(val)}
          value={selectedChain}
          options={[
            {
              label: "Ethereum",
              value: "0x1",
            },
            {
              label: "BinanceChain",
              value: "0x38",
            },
            {
              label: "Polygon",
              value: "0x89",
            },
            
          ]}
          className="dropdown"
        ></Select>
        </div>
        <hr
        style={{width:'100%'}}
        />
        <div className='wallet-details'>
          <h4>{address.replace(/^(0x.{4}).*(.{4})$/, '$1....$2')}</h4>
          <CopyToClipboard
          text={address}
          >
            <FaCopy
            style={{cursor:'pointer'}}
             onClick={()=>toast.success('copied to clipboard')}
            />
          </CopyToClipboard>
          <h1>{balance.toFixed(2)} {CHAINS_CONFIG[selectedChain]?.ticker}</h1>
        </div>

        <div className="action-buttons">
          <button
          onClick={()=>navigate('/send')}
          >
            <FaArrowUp/>
            Send</button>
          <button
          onClick={()=>navigate('/swap')}
          >
            <AiOutlineSwap/>
            Swap</button>
          <button
          onClick={()=>navigate('/buy')}
          >
            <BsCurrencyExchange/>
           Buy/Sell</button>
          <button
          onClick={()=>toast.success('Copy your eth address to the sender')}
          >
            <MdCallReceived/>
            Recieve</button>
        </div>

        <div
        className="wallet-view-info"
        >
          
        <Tabs defaultActiveKey="1" 
        className="tab-info"
        color="white"
        items={items} 
        style={{color:'white'}}
        />
       
        </div>
        

      </div>
    </>
  );
}

export default WalletView;
