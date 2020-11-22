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
      email: '',
      password: ''
    },
    signInSchema: Yup.object().shape({
      email: Yup.string().email("Не правильный email").required("Введите email"),
      password: Yup.string()
        .required("Введите пароль")
        .min(6, "Пароль должен быть минимум 6 символов"),
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
                <div className="container">
                  <h2 className="login-box__title">{this.state.singIn ? 'Войти в аккаунт' : 'Регистрация'}</h2>
                  <Form>
                    <div className="login-box__form-item">
                      <div className="input">
                        <label htmlFor="email" className="input__label">Email</label>
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          className={errors.email && touched.email ?
                            "input-error" : null}
                          className="input__item"
                        />
                      </div>
                      <ErrorMessage name="email" component="span" className="input__error" />
                    </div>

                    <div className="login-box__form-item">
                      <label htmlFor="password" className="input__label">Password</label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className={errors.password && touched.password ?
                          "input-error" : null}
                        className="input__item"
                      />
                      <ErrorMessage name="password" component="span" className="input__error" />
                    </div>
                    <Button
                      center
                      type="submit"
                      onClick={this.signIn}
                    >Войти</Button>
                  </Form>
                </div>
              );
            }}
          </Formik>
        </div>
        {/* <span className="login-box__form-link" onClick={() => { this.setState({ singIn: !this.state.singIn }) }}>
          {this.state.singIn ? 'Регистрация' : 'Войти в аккаунт'}
        </span> */}
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