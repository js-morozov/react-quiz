import React, { Component } from 'react';
import './QuizList.scss'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { getQuizList } from '../../store/actions/quizList'

class QuizList extends Component {

  componentDidMount() {
    if (!this.props.quizList.length) {
      this.props.getQuizList()
    }
  }

  render() {
    return (
      <div className="quiz-list">
        <h3 className="quiz-list__title">Список тестов</h3>
        {this.props.quizList.map((test) => {
          return (
            <NavLink to={'test/' + test.id} className="quiz-list__item" key={test.id}>
              <p className="quiz-list__caption">
                <span className="quiz-list__name">{test.name}</span>
                <span className="quiz-list__category">Marketing</span>
              </p>
              <button class="quiz-list__dots">
                <i class="fas fa-ellipsis-h"></i>
              </button>
            </NavLink>
          )
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizList: state.quizList.quizList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getQuizList: () => dispatch(getQuizList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);