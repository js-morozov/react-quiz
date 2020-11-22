import axios from 'axios'
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionsType'
import { NotificationManager } from 'react-notifications';

const createNotification = (type) => {
  console.log(type)
  switch (type) {
    case 'INVALID_PASSWORD':
      NotificationManager.info('Info message');
      break;
    // case 'success':
    //   NotificationManager.success('Success message', 'Title here');
    //   break;
    // case 'warning':
    //   NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
    //   break;
    // case 'error':
    //   NotificationManager.error('Error message', 'Click me!', 5000, () => {
    //     alert('callback');
    //   });
    //   break;
  }
}

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
    }).catch((error) => {
      const errors = error.response.data.error.errors.map(errorItem => errorItem.message)
      errors.forEach(item => {
        createNotification(item)
      })
    })
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
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