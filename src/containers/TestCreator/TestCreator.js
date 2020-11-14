import React from 'react';
import './TestCreator.scss'
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button'
import Radio from '../../components/Radio/Radio'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default class TestCreator extends React.Component {

  state = {
    answers: [{ text: '', correct: false }]
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

  render() {
    return (
      <form onSubmit={this.submitHandler} className="test-creator">
        <h1 className="test-creator__title">Создать тест</h1>
        <div className="test-creator__item">
          <Input label="Вопрос" />
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
          <Button>Добавить вопрос</Button>
          <Button primary>Завершить</Button>
        </div>
      </form>
    );
  }
}