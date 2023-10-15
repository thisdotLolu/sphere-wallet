import "./App.css";
import {Routes, Route} from 'react-router-dom'
import Home from "./components/Home";
import RecoverAccount from "./components/RecoverAccount";
import CreateAccount from "./components/CreateAccount";
import Backup from "./components/Backup";
import { Toaster } from 'react-hot-toast';
import { useContext } from "react";
import { WalletContext } from "./context/WalletContext";
import WalletView from "./components/WalletView";
import SignIn from "./components/SignIn";
import TokenAdder from "./components/TokenAdder";
import Send from "./components/Send";
import Buy from "./components/Buy";
import Swap from "./components/Swap";
import { MoralisProvider } from "react-moralis";

function App() {

  const {wallet,seedPhrase} = useContext(WalletContext)
  return (
    <div className='App'>
      <Toaster
       containerStyle={{
        position: 'absolute',
      }}
      toastOptions={{
        className: 'toast',
        style: {
          marginTop:'20px',
          border: '1px solid #343663',
          backgroundColor:'#343663',
          padding: '16px',
          color: 'white',
          width:'100%',
          zIndex:'10000000000000000000000000000000000000000000000000000000000000',
        },
      }}
      />
      {/* <header>

      </header> */}
      
      <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/recover' element={<RecoverAccount/>}/>
       <Route path='/create-wallet' element={<CreateAccount/>}/>
       <Route path='/back-up' element={<Backup/>}/>
       <Route path='/sign-in' element={<SignIn/>}/>
       <Route path='/wallet-view' element={<WalletView/>}/>
       <Route path='/add-token' element={<TokenAdder/>}/>
       <Route path='/send' element={<Send/>}/>
       <Route path='/buy' element={<Buy/>}/>
       <Route path='/swap' element={<Swap/>}/>
     </Routes>
    </div>
  );
}

export default App;
