import React, { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import ReactLoading from 'react-loading';

const Loading = () => {

  return (
    <div className='loader'>
        <ReactLoading
    type={'spin'}
    />
    </div>
    
  )
}

export default Loading