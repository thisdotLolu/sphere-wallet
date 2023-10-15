import React, { useState } from 'react'

const Modal = ({text,borderColor,bgColor}) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleSlide = () => {
      setIsVisible(!isVisible);
    };

     
    const slideClass = isVisible ? 'slide-in' : 'slide-out';
  return (
    <div 
    style={{backgroundColor:bgColor, border:`1px solid ${borderColor}`}}
    className={`modal-container ${slideClass}`}>
        {text}
    </div>
  )
}

export default Modal