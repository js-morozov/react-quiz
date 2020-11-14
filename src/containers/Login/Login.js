import React from 'react';
import './Login.scss'
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import axios from 'axios'

export default class Login extends React.Component {
  state = {
    singIn: true,
    email: 'frontend.morozov@gmail.com',
    password: '322141357'
  }

  submitHandler = event => {
    event.preventDefault()
  }

  // Регистрация пользователя
  signUp = async () => {
    const authData = {
      email: this.state.email,
      password: this.state.password,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmehtTLcIy6CkW7hvrN6ziGGlCLUDg3PE', authData)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  // Войти в систему
  signIn = async () => {
    const authData = {
      email: this.state.email,
      password: this.state.password,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmehtTLcIy6CkW7hvrN6ziGGlCLUDg3PE', authData)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div className="login-box login-box--image">
        <form className="login-box__form" onSubmit={this.submitHandler}>
          <h2 className="login-box__title">{this.state.singIn ? 'Войти в аккаунт' : 'Регистрация'}</h2>
          {
            this.state.singIn ?
              <div>
                <div className="login-box__form-item">
                  <Input
                    label={'Email'}
                    value={this.state.email}
                    onChange={(event) => { this.setState({ email: event.target.value }) }}
                  />
                </div>
                <div className="login-box__form-item">
                  <Input
                    type="password"
                    label={'Пароль'}
                    value={this.state.password}
                    onChange={(event) => { this.setState({ password: event.target.value }) }}
                  />
                </div>
              </div>
              :
              <div>
                <div className="login-box__form-item">
                  <Input label={'Email'} />
                </div>
                <div className="login-box__form-item">
                  <Input type="password" label={'Пароль'} />
                </div>
                <div className="login-box__form-item">
                  <Input type="password" label={'Подтвердите пароль'} />
                </div>
              </div>
          }
          <Button center onClick={this.state.singIn ? this.signIn : this.signUp}>
            {this.state.singIn ? 'Войти' : 'Создать'}
          </Button>
          <span className="login-box__form-link" onClick={() => { this.setState({ singIn: !this.state.singIn }) }}>
            {this.state.singIn ? 'Регистрация' : 'Войти в аккаунт'}
          </span>
        </form>
      </div>
    );
  }
}