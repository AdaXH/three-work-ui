import React from 'react';
import './index.css'

const Button = ({ type, disabled = false, onClick = () => undefined, children = '', loading }) => {
  let buttonType;
  switch (type) {
    case 'primary': buttonType = 'primaryButton'; break;
    case 'danger': buttonType = 'dangerButton'; break;
    case 'warning': buttonType = 'warningButton'; break;
    case 'success': buttonType = 'successButton'; break;
    default: buttonType = 'defaultButton';
  }
  if (disabled) {
    return (
      <div
        className='disableButton componentButton'
      >
        {children}
      </div>
    )
  }else if (loading){
    return (
      <div
        className='loadingButton componentButton'
      >
        <span></span><b>Loading...</b>
      </div>
    )
  }
  return (
    <div
      className={`${buttonType} componentButton`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Button;