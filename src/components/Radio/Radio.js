import React from 'react';
import './Radio.scss'

const Radio = (props) => {
  return (
    <label className="radio">
      <input type="radio" name={props.name} className="radio__input" checked={props.checked} onChange={props.onChange} />
      <span className="radio__item">
        <svg className="radio__svg" width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d)">
            <path d="M5 11.0314C5 11.0314 9.125 19.3246 9.125 17.8168C9.125 16.3089 13.7186 8.59769 20 5" stroke="white" strokeWidth="3" />
          </g>
          <defs>
            <filter id="filter0_d" x="0.657059" y="0.69838" width="23.0885" height="21.8011" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="1.5" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
          </defs>
        </svg>
      </span>
      <span className="radio__text">{props.text}</span>
    </label>
  );
};

export default Radio;