import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Buy = () => {
    const navigate = useNavigate()
  return (
    <div className='buy'>
         <FaArrowLeft
        onClick={()=>navigate(-1)}
        className='arrowBack'
        />
        <h1>Buy / Sell ETH with MoonPay</h1>


        <p>By clicking the payment button, you will be redirected to moonpay.com, a separate platform owned by a third party, MoonPay. 

Please note that credit card payment services are provided by MoonPay.

Sphere Wallet acts solely as a facilitator and does not assume any responsibility for potential losses or damages arising from the use of the credit card payment service.

Kindly take a moment to review and accept this disclaimer before proceeding further.</p>

<button>
    <a href='https://www.moonpay.com/buy/eth'
    target='_blank'
    rel='noreferrer'
    style={{color:'white', textDecoration:"none"}}
    >
        Continue with MoonPay
        </a>    
    </button>
    
    </div>
  )
}

export default Buy


{/* <iframe
  src="https://buy.moonpay.com/?apiKey=[your_api_key]"
  allow="accelerometer; autoplay; camera; gyroscope; payment"
  width="100%"
  height="100%"
  frameborder="0"
  title='moonpay'
  >
</iframe> */}