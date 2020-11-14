import React from 'react';

const List = (props) => {
  return (
    <form className="form">
      <ul className="list">
        {props.children}
      </ul>
    </form>
  );
};

export default List;