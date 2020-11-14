import React from 'react';
import './Input.scss'

const Input = (props) => {
  const inputType = props.type || 'text'
  const htmlFor = `${inputType}-${Math.random()}`

  return (
    <div className="input">
      <label className="input__label" htmlFor={htmlFor}>{props.label}</label>
      <input
        id={htmlFor}
        type={inputType}
        value={props.value}
        onChange={props.onChange}
        className="input__item"
      />
      {
        props.errorMessage
          ? <span className="input__error">{props.errorMessage}</span>
          : null
      }

    </div>
  );
};

export default Input;