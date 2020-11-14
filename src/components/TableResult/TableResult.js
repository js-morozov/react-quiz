import React from 'react';
import './TableResult.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const TableResult = (props) => {
  return (
    <table className="result">
      {props.test.map((item, index) => {
        return (
          <tr>
            <td>{index + 1}.</td>
            <td>{item.question}</td>
            <td>{props.answers[index] ?
              <FontAwesomeIcon icon={faCheckCircle} className="result--correct" /> :
              <FontAwesomeIcon icon={faTimesCircle} className="result--wrong" />}
            </td>
          </tr>
        )
      })}
    </table>
  );
};

export default TableResult;