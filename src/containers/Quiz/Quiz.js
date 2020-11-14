import React, { Component } from 'react';
import List from '../../components/List/List'
import ListItem from '../../components/List/ListItem/ListItem'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Button from '../../components/Button/Button'
import TableResult from '../../components/TableResult/TableResult'
import './Quiz.scss'

class Quiz extends Component {

  state = {
    selected: null,
    answers: [],
    isFinished: false,
    currentQuestionIndex: 0,
    test: [
      {
        id: 1,
        question: 'Выберите HTML тег для самого крупного заголовка',
        answers: [
          {
            text: '<head>',
            correct: false
          },
          {
            text: '<h6>',
            correct: false
          },
          {
            text: '<heading>',
            correct: false
          },
          {
            text: '<h1>',
            correct: true
          },
        ]
      },
      {
        id: 2,
        question: 'Выберите правильный HTML тег для переноса на новую строку?',
        answers: [
          {
            text: '<br>',
            correct: true
          }, {
            text: '<break>',
            correct: false
          },
          {
            text: '<lb>',
            correct: false
          },
        ]
      },
      {
        id: 3,
        question: 'Выберите правильный способ создания ссылки?',
        answers: [
          {
            text: '<a name="http://www.w3schools.com">W3Schools.com</a>',
            correct: false
          }, {
            text: '<a href="http://www.w3schools.com">W3Schools</a>',
            correct: true
          },
          {
            text: '<a>http://www.w3schools.com</a>',
            correct: false
          },
          {
            text: '<a url="http://www.w3schools.com">W3Schools.com</a>',
            correct: false
          }
        ]
      },
      {
        id: 4,
        question: 'Выберите тег для создания маркированного списка?',
        answers: [
          {
            text: '<dl>',
            correct: false
          },
          {
            text: '<ol>',
            correct: true
          },
          {
            text: '<list>',
            correct: false
          },
          {
            text: '<ul>',
            correct: false
          },
        ]
      },
      {
        id: 5,
        question: 'Выберите верный способ создания чекбокса?',
        answers: [
          {
            text: '<check>',
            correct: false
          },
          {
            text: '<input type="checkbox">',
            correct: true
          },
          {
            text: '<input type="check">',
            correct: false
          },
          {
            text: '<checkbox>',
            correct: false
          },
        ]
      },
    ]
  }

  isLastQuestion = () => {
    return this.state.currentQuestionIndex < this.state.test.length - 1
  }

  nextQuestion = () => {
    this.state.answers.push(this.state.selected.correct)

    if (this.isLastQuestion()) {
      this.setState({
        selected: null,
        currentQuestionIndex: this.state.currentQuestionIndex + 1
      })
      this.getPercentForProgressBar()
    } else {
      this.setState({
        isFinished: true
      })
    }
  }

  correctAnswersQuantity = () => {
    return this.state.answers.filter(item => item).length
  }

  selectAnswer = (answer) => {
    this.setState({
      selected: { ...answer },
    })
  }

  getPercentForProgressBar = () => {
    const totalTestQuestions = this.state.test.length
    const currentQuestionNumber = this.state.currentQuestionIndex + 1

    return Math.round((currentQuestionNumber / totalTestQuestions) * 100)
  }

  resetTest = () => {
    this.setState({
      selected: null,
      answers: [],
      isFinished: false,
      currentQuestionIndex: 0,
    })
  }

  render() {
    return (
      <div className="quiz">
        <div className="quiz__header">
          <h1 className="title">HTML Test</h1>
          {!this.state.isFinished ? <span className="counter">{this.state.currentQuestionIndex + 1} из {this.state.test.length}</span> : ''}
        </div>

        <ProgressBar percent={this.getPercentForProgressBar()} />

        <h3 className="question">{
          !this.state.isFinished ?
            this.state.test[this.state.currentQuestionIndex].question :
            `Результаты теста (${this.correctAnswersQuantity()} из ${this.state.test.length})`
        }</h3>

        {!this.state.isFinished ?
          <List>
            {
              this.state.test[this.state.currentQuestionIndex].answers.map(answer => {
                return <ListItem text={answer.text} key={answer.text} onClick={this.selectAnswer.bind(null, answer)} />
              })
            }
          </List>
          :
          <TableResult test={this.state.test} answers={this.state.answers} />
        }

        {!this.state.isFinished ?
          <Button onClick={this.nextQuestion} right disabled={!this.state.selected}>
            {this.state.currentQuestionIndex !== (this.state.test.length - 1) ? 'Next' : 'Finish'}
          </Button>
          :
          <Button right onClick={this.resetTest}>Пройти еще раз</Button>
        }
      </div>
    );
  }
}

export default Quiz;