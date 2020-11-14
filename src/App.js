import React from 'react';
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import TestCreator from './containers/TestCreator/TestCreator'
import Login from './containers/Login/Login'
import TheHeader from './components/TheHeader/TheHeader'
import { Route } from 'react-router-dom'

function App() {
  return (
    <Layout>
      <TheHeader />
      <Route exact path="/" component={Login} />
      <Route exact path="/test" component={Quiz} />
      <Route exact path="/create-test" component={TestCreator} />
    </Layout>
  );
}

export default App;