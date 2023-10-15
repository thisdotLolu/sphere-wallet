import React from 'react'

const Progress = ({number}) => {
  return (
    <div className='progress'>
        {number === '1' && (
            <>
            <div
            style={{backgroundColor:'#ffff'}}
            ></div>
            <div
            style={{backgroundColor:'#312E2E'}}
            ></div>
            <div
            style={{backgroundColor:'#312E2E'}}
            ></div>
            <div
            style={{backgroundColor:'#312E2E'}}
            ></div>
            </>)
        }
        {number === '2' && (
            <>
            <div
            style={{backgroundColor:'#ffff'}}
            ></div>
            <div
            style={{backgroundColor:'#ffff'}}
            ></div>
            <div
            style={{backgroundColor:'#312E2E'}}
            ></div>
            <div
            style={{backgroundColor:'#312E2E'}}
            ></div>
            </>)
        }
        {number === '3' && (
            <>
            <div
            style={{backgroundColor:'#ffff'}}
            ></div>
            <div
            style={{backgroundColor:'#ffff'}}
            >
            </div>
            <div
            style={{backgroundColor:'#ffff'}}
            ></div>
            <div
            style={{backgroundColor:'#312E2E'}}
            ></div>
            </>)
        }
        {number === '4' && (
            <>
            <div
            style={{backgroundColor:'#ffff'}}
            ></div>
            <div></div>
            <div></div>
            <div></div>
            </>)
        }
        
    </div>
  )
}

export default Progress