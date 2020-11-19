import React from 'react';
import './Login.scss'
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { auth } from '../../store/actions/auth'
import { connect } from 'react-redux';

class Login extends React.Component {
  state = {
    singIn: true,
    email: 'frontend.morozov@gmail.com',
    password: '322141357'
  }

  submitHandler = event => {
    event.preventDefault()
  }

  // Регистрация пользователя
  signUp = () => {
    this.props.auth(this.state.email, this.state.password, false)
  }

  // Войти в систему
  signIn = () => {
    this.props.auth(this.state.email, this.state.password, true)
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

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Login)