import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import CompanyListings from './components/CompanyListings';
import JobListings from './components/JobListings';
import RegisterForm from './components/RegisterForm';
import  LoginForm from './components/LoginForm';
import Nav from './components/Nav'


const DynamicRoute = (props) => {
  const styleObj = {padding: '3rem', fontSize: '6vw', color: '#0E6655'}
  return <h2 style={styleObj}>Dynamic Route: <u>{props.match.params.routeVal}</u></h2>
}

const DemoComponent = () => {
  const styleObj = {padding: '3rem', fontSize: '6vw', color: 'slateblue'}
  return <h2 style={styleObj}>Demo Route U</h2>
}

const NoMatch404 = () => {
  const styleObj = {padding: '3rem', fontSize: '6vw', color: 'indianred'}
  return <h2 style={styleObj}>No Match - 404</h2>
}

class App extends React.Component {
  render (){
    return <div>
      <Nav />
      <Switch>
        <Route path='/ex/:routeVal' component={DynamicRoute}/>
        <Route path='/demo' component={DemoComponent}/>
        <Route path='/companies' component={CompanyListings}/>
        <Route path='/jobs' component={JobListings}/>
        <Route path='/login' component={LoginForm}/>
        <Route path='/register' component={RegisterForm}/>
        <Route component={NoMatch404}/>
      </Switch>
    </div>
  }
}

ReactDOM.render(<BrowserRouter>
  <App/>
</BrowserRouter>, document.getElementById('app-container'));
