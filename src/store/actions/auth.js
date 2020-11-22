import axios from 'axios'
import { AUTH_SUCCESS, AUTH_ERRORS, AUTH_LOGOUT } from './actionsType'

export function auth(email, password, isLogin) {
  return dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmehtTLcIy6CkW7hvrN6ziGGlCLUDg3PE'
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmehtTLcIy6CkW7hvrN6ziGGlCLUDg3PE'
    }

    axios.post(url, authData).then((response) => {
      const data = response.data
      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)
      localStorage.setItem('expirationDate', expirationDate)

      dispatch(authSuccess(data.idToken))
      dispatch(autoLogout(data.expiresIn))
      dispatch(authErrors([]))
    }).catch((error) => {
      dispatch(authErrors(error.response.data.error.errors.map(errorItem => errorItem.message)))
    })
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}

export function authErrors(errors) {
  const errorsMessages = []
  errors.forEach(error => {
    switch (error) {
      case 'EMAIL_NOT_FOUND':
        errorsMessages.push('Такого email не существует')
        break
      case 'INVALID_PASSWORD':
        errorsMessages.push('Неправильный пароль')
        break
      default:
        errorsMessages.push('Доступ к аккаунту временно закрыт')
    }
  })
  return {
    type: AUTH_ERRORS,
    errors: errorsMessages
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000);
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}