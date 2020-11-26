import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import axios from '../../axios/axios'

class QuizList extends Component {

  state = {
    tests: []
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('/quizes.json')
      const tests = []
      Object.keys(data).forEach((item, index) => {
        tests.push({
          id: item,
          name: `Test #${index + 1}`,
          questions: data[item]
        })
      })
      this.setState({ tests })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <h1>Список тестов</h1>
        <ul>
          {this.state.tests.map((test) => {
            return (
              <li key={test.id}>
                <NavLink to={'test/' + test.id}>
                  <strong>{test.name}.</strong> Test ID: {test.id}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default QuizList;