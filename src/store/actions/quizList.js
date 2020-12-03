import axios from '../../axios/axios'
import { QUIZ_LIST } from './actionsType'

export function getQuizList() {
  return dispatch => {

    axios.get('/quizes.json').then(response => {
      const { data } = response
      const testList = []
      Object.keys(data).forEach((item, index) => {
        testList.push({
          id: item,
          name: `Test #${index + 1}`,
          questions: data[item]
        })
      })
      dispatch(setQuizList(testList))
    }).catch(error => {
      console.log(error)
    })
  }
}

export function setQuizList(list) {
  return {
    type: QUIZ_LIST,
    list
  }
}