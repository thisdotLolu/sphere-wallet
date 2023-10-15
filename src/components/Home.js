import React, { useEffect } from "react";
import Progress from "./Progress";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Home() {


  const address = localStorage.getItem('sphalletAddress');
  console.log(address)
  
  
  const navigate = useNavigate()


  return (
    <>
      <div 
      style={{padding:'20px'}}
      className="content">
        {address === "" ? <Progress number="1" /> : ""}

        <div className="hero">
          <img src="/sphereWelcome.png" alt="sphere" />
          <h2>sphere</h2>
        </div>

        <div className="bottom">
          {address ? (
            <>
              <Button onClick={() => navigate("/sign-in")}>Sign in</Button>

              <button onClick={() => navigate("/recover")}>
                Sign in With Seed Phrase
              </button>
              <p style={{fontSize:'.8rem', color:'white', marginTop:'-15px'}}>**sign in with your seed phrase if you are coming from another wallet</p>

            </>
          ) : (
            <>
              <Button onClick={() => navigate("/create-wallet")}>
                create new wallet
              </Button>
              <Button onClick={() => navigate("/recover")}>
                import wallet
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
