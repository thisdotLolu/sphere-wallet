import { createContext, useState } from "react";
import {ethers} from 'ethers'

export const WalletContext = createContext()


export const WalletContextProvider = ({children})=>{

    const [seedPhrase,setSeedPhrase] = useState('')
    const [wallet,setWallet] = useState('')
    const [selectedChain, setSelectedChain] = useState("0x1");
    

    
    return(
        <WalletContext.Provider
        value={{seedPhrase,setSeedPhrase,wallet,setWallet,selectedChain,setSelectedChain}}
        >
            {children}
        </WalletContext.Provider>
    )
}