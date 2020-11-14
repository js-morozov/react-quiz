import React from 'react';
import Radio from '../../../components/Radio/Radio'
import './ListItem.scss'

const ListItem = (props) => {
  return (
    <li className="list__item" onClick={props.onClick}>
      <Radio name="answer" text={props.text} />
    </li>
  );
};

export default ListItem;