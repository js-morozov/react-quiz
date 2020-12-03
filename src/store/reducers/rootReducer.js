import { combineReducers } from 'redux'
import authReducer from "./auth";
import quizListReducer from "./quizList";

export default combineReducers({
  auth: authReducer,
  quizList: quizListReducer
})