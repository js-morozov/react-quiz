import React from 'react';
import './Button.scss'

const Button = (props) => {
  const classes = [
    'button',
    props.right ? 'button--right' : '',
    props.center ? 'button--center' : '',
    props.primary ? 'button--primary' : '',
    props.success ? 'button--success' : ''
  ]

  return (
    <button
      className={classes.join(' ')}
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;