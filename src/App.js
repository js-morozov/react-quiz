import React from 'react';
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import TestCreator from './containers/TestCreator/TestCreator'
import Login from './containers/Login/Login'
import TheHeader from './components/TheHeader/TheHeader'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';
import { autoLogin } from './store/actions/auth'

class App extends React.Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={QuizList} />
        <Route exact path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/" component={QuizList} />
          <Route exact path="/test" component={Quiz} />
          <Route exact path="/create-test" component={TestCreator} />
          <Route exact path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout>
        <TheHeader isAuthenticated={this.props.isAuthenticated} />
        {routes}
      </Layout>
    )
  }
}

function maStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(maStateToProps, mapDispatchToProps)(App));