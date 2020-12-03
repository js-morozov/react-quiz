import { QUIZ_LIST } from '../actions/actionsType'

const initialState = {
  quizList: []
}

export default function quizListReducer(state = initialState, action) {
  switch (action.type) {
    case QUIZ_LIST:
      return {
        ...state,
        quizList: action.list
      }
    default:
      return state
  }
}