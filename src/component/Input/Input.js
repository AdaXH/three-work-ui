import React, { useState, useEffect } from 'react';
import { check } from './util';
import './index.less';

export default props => {
  const {
    type,
    disabled,
    placeholder,
    value: propsValue,
    defaultValue,
    size = 'default',
    onChange: propsOnChange,
  } = props;
  const [value, setValue] = useState(propsValue || defaultValue);
  useEffect(
    () => {
      setValue(propsValue);
    },
    [propsValue]
  );
  const onChange = newValue => {
    setValue(newValue);
    propsOnChange && propsOnChange(newValue);
  };
  return (
    <div className="TW_UI_inputContainer">
      <input
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={`TW_UI_input TW_UI_input_${check(
          'size',
          size
        )} TW_UI_input_${check('type', type)}`}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};
