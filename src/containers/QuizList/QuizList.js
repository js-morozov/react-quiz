import React, { Component } from 'react';
import axios from 'axios'

class QuizList extends Component {

  state = {
    tests: []
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('https://quiz-12b33.firebaseio.com/quizes.json')
      const tests = []
      Object.keys(data).forEach((item, index) => {
        tests.push({
          id: item,
          name: `Test #${index + 1}`,
          questions: data[item]
        })
      })
      console.log(tests)
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
              <li key={test.id}><strong>{test.name}.</strong> Test ID: {test.id}</li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default QuizList;