import React from 'react';
import './TestCreator.scss'
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button'
import Radio from '../../components/Radio/Radio'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

export default class TestCreator extends React.Component {

  state = {
    test: [],
    question: '',
    answers: [{ text: '', correct: false }],
    type: 0,
    itemsType: [
      {
        value: 0,
        text: 'Одиночный выбор'
      },
      {
        value: 1,
        text: 'Множественный выбор'
      }
    ]
  }

  addAnswer = () => {
    const answers = [...this.state.answers]
    if (answers.length < 4) {
      answers.push({ text: '', correct: false })
      this.setState({ answers })
    }
  }

  deleteAnswer = (index) => {
    const answers = [...this.state.answers]
    if (answers.length > 1) {
      answers.splice(index, 1)
      this.setState({ answers })
    }
  }

  fillAnswer = (text, index) => {
    const answers = [...this.state.answers]
    answers[index].text = text
    this.setState({ answers })
  }

  setCorrectAnswer = (index) => {
    const answers = [...this.state.answers]
    answers.map((item, i) => {
      item.correct = (i === index) ? true : false
      return item
    })
    this.setState({ answers })
  }

  submitHandler = event => {
    event.preventDefault()
  }

  clearFields = () => {
    this.setState({
      question: '',
      answers: [{ text: '', correct: false }]
    })
  }

  addQuestionToTest = () => {
    const { test, question, answers } = this.state
    test.push({
      question,
      answers
    })
    this.setState({ test })
    this.clearFields()
  }

  finishCreate = () => {
    const test = [...this.state.test]
    axios.post('https://quiz-12b33.firebaseio.com/quizes.json', test).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <form onSubmit={this.submitHandler} className="test-creator">
        <h1 className="test-creator__title">Создать тест</h1>
        <div className="test-creator__item">
          <Select
            label="Тип вопроса"
            items={this.state.itemsType}
            value={this.state.type}
            onChange={(e) => this.setState({ type: +e.target.value })}
          />
        </div>
        <div className="test-creator__item">
          <Input label="Вопрос" value={this.state.question} onChange={(e) => this.setState({ question: e.target.value })} />
        </div>
        <div className="test-creator__group">
          {
            this.state.answers.map((answer, index) => {
              return (
                <div className="test-creator__item" key={index}>
                  <div className="test-creator__answer">
                    <div className="test-creator__radio">
                      <Radio name="answer" checked={answer.correct} onChange={this.setCorrectAnswer.bind(null, index)} />
                    </div>
                    <Input label={`Ответ #${index + 1}`} value={answer.text} onChange={(e) => this.fillAnswer(e.target.value, index)} />
                    <div className="test-creator__icon test-creator__icon--success" onClick={this.addAnswer}>
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                    <div className="test-creator__icon" onClick={this.deleteAnswer.bind(null, index)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="test-creator__buttons">
          <Button onClick={this.addQuestionToTest}>Добавить вопрос</Button>
          <Button primary onClick={this.finishCreate}>Завершить</Button>
        </div>
      </form>
    );
  }
}