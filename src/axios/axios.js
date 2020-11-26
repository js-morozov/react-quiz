import axios from 'axios'

export default axios.create({
  baseURL: 'https://quiz-12b33.firebaseio.com/'
})