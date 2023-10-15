import React from 'react'

const Button = ({children, onClick,disabled}) => {
  return (
    <button
    disabled={disabled === true}
    onClick={onClick}
    className='button'>
        {children}
    </button>
  )
}

export default Button