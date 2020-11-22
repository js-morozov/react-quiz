import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Button from './Button'

configure({
  adapter: new Adapter()
})

describe('<Button />', () => {
  it('Has class .button--right with prop.right', () => {
    const wrapper = shallow(<Button right />)
    expect(wrapper.find('.button').hasClass('button--right')).toBe(true)
  })
  it('Has class .button--center with prop.center', () => {
    const wrapper = shallow(<Button center />)
    expect(wrapper.find('.button').hasClass('button--center')).toBe(true)
  })
  it('Has class .button--primary with prop.primary', () => {
    const wrapper = shallow(<Button primary />)
    expect(wrapper.find('.button').hasClass('button--primary')).toBe(true)
  })
  it('Has class .button--success with prop.success', () => {
    const wrapper = shallow(<Button success />)
    expect(wrapper.find('.button').hasClass('button--success')).toBe(true)
  })
  it('Has disabled prop', () => {
    const wrapper = shallow(<Button disabled />)
    expect(wrapper.find('.button').props()["disabled"]).toBe(true)
  })
})