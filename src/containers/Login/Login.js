import React from 'react';
import './Login.scss'
import Button from '../../components/Button/Button';
import { auth } from '../../store/actions/auth'
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

class Login extends React.Component {
  state = {
    formInitialState: {
      email: 'frontend.morozov@gmail.com',
      password: '322141357'
    },
    signInSchema: Yup.object().shape({
      email: Yup.string().email("Не правильный email").required("Введите email"),
      password: Yup.string()
        .required("Введите пароль")
        .min(6, "Минимум 6 символов"),
    })
  }

  submitHandler = event => {
    event.preventDefault()
  }

  // Регистрация пользователя
  signUp = () => {
    // this.props.auth(this.state.email, this.state.password, false)
  }

  render() {
    return (
      <div className="login-box login-box--image">
        <div className="login-box__form">
          <Formik
            initialValues={this.state.formInitialState}
            validationSchema={this.state.signInSchema}
            onSubmit={({ email, password }) => {
              this.props.auth(email, password, true)
            }}
          >
            {(formik) => {
              const { errors, touched } = formik;
              return (
                <Form>
                  <h2 className="login-box__title">
                    {this.state.singIn ? 'Войти в аккаунт' : 'Регистрация'}
                  </h2>
                  <div className="login-box__form-item">
                    <div className="input">
                      <label htmlFor="email" className="input__label">Email</label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className={['input__item', errors.email && touched.email ? 'input__item--error' : ''].join(' ')}
                      />
                      <ErrorMessage name="email" component="span" className="input__error" />
                    </div>
                  </div>

                  <div className="login-box__form-item">
                    <div className="input">
                      <label htmlFor="password" className="input__label">Password</label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className={['input__item', errors.password && touched.password ? 'input__item--error' : ''].join(' ')}
                      />
                      <ErrorMessage name="password" component="span" className="input__error" />
                    </div>
                  </div>
                  <div className="login-box__actions">
                    <Button
                      center
                      type="submit"
                      onClick={this.signIn}
                    >Войти</Button>
                    <span className="login-box__form-link">Регистрация</span>
                  </div>
                  <span className="login-box__error">{this.props.authErrors.join(' ')}</span>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authErrors: state.auth.errors
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)