import React from 'react';
import './ProgressBar.scss'

const ProgressBar = (props) => {
  return (
    <div className="progress">
      <span className="line" style={{ width: `${props.percent}%` }}></span>
    </div>
  );
};

export default ProgressBar;