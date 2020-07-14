import * as React from 'react';
import './index.css'

export interface ButtonProps {
  onClick?: () => void,
  type?: string,
  disabled?: boolean,
  children?: string,
  loading?: boolean
}

const Button = (props: ButtonProps) => {
  const defaultProps = {
    type: '',
    onClick: () => void 0,
    disabled: false,
    children: '',
    loading: false
  }

  const { type, onClick, disabled, children, loading } = {
    ...defaultProps,
    ...props
  }

  let buttonType;
  switch (type) {
    case 'primary': buttonType = 'primaryButton'; break;
    case 'danger': buttonType = 'dangerButton'; break;
    case 'warning': buttonType = 'warningButton'; break;
    case 'success': buttonType = 'successButton'; break;
    case 'default': buttonType = 'defaultButton'; break;
    default: buttonType = 'defaultButton';
  }
  if (disabled) {
    return <div className="disableButton componentButton">{children}</div>;
  } else if (loading) {
    return (
      <div className="loadingButton componentButton">
        <span />
        <b>Loading...</b>
      </div>
    )
  }else if (loading){
    return (
      <div
        className='loadingButton componentButton'
      >
        <span></span><b>{children ? children : 'Loading...'}</b>
      </div>
    )
  }
  return (
    <div className={`${buttonType} componentButton`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
