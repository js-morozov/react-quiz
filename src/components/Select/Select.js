import React from 'react'
import './Select.scss'

class Select extends React.Component {
  render() {
    return (
      <div className="select">
        <label className="select__label">{this.props.label}</label>
        <select className="select__control" value={this.props.value} onChange={this.props.onChange}>
          {
            this.props.items.map(item => {
              return (
                <option value={item.value}>{item.text}</option>
              )
            })
          }
        </select>
      </div>
    )
  }
}

export default Select