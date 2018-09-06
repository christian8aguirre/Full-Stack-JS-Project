import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, withRouter} from 'react-router-dom';
import CompanyListings from './components/CompanyListings';
import JobListings from './components/JobListings';
import RegisterForm from './components/RegisterForm';
import  LoginForm from './components/LoginForm';
import Nav from './components/Nav';
import request from 'superagent';


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

// B.1 - Pass react-router information to NavBar component
const NavBarWithRouter = withRouter(Nav)

class App extends React.Component {
  // A.1 - Pass react-router information to NavBar component
  constructor(...args){
    super(...args)
    this.state = {
      currentUser : {}
    }
  }

  /* D.1 - write method to let us change state of App component from child components */
  _setAppState(stateObj){
    this.setState(stateObj)
  }

   /*E.1 - get current user from /auth/current, set to component state*/
   componentWillMount(){
    /* NOTE `this` keyword loses reference to APP inside superagent's .then() callback function */
    const component = this
    request.get('/auth/current')
      .then((serverRes)=>{
        const userInfo = serverRes.body
        component.setState({
          currentUser : userInfo
        })
      })
  }

  render (){
    const appComponent = this

    /* D.2 - bind the _setAppState() method to this (App) component */
    const _setAppStateWithAppContext = this._setAppState.bind(this)
    return <div>
      <NavBarWithRouter
        {...this.props}
        /* C.1a - pass state as props*/
        appState={this.state}

        /* D.3a - pass binded method as props */
        setAppState={_setAppStateWithAppContext}

      />
      <Switch>
        <Route path='/dashboard' component={(thePropsWithRouterInfo)=>{
            return <Dashboard
                    {...thePropsWithRouterInfo}
                    /* C.2a - pass state as props*/
                    appState={this.state}
                  />
          }}
        />

        <Route path='/ex/:routeVal' component={DynamicRoute}/>
        <Route path='/demo' component={DemoComponent}/>
        <Route path='/companies' component={CompanyListings}/>
        <Route path='/jobs' component={JobListings}/>
        <Route path='/login'
          component={ (thePropsWithRouterInfo) => {
              return <LoginForm
                {...thePropsWithRouterInfo}
                /* D.3b - pass binded method as props */
                setAppState={ _setAppStateWithAppContext }
                />
          }}
        />
        <Route path='/register' component={RegisterForm}/>
        <Route component={NoMatch404}/>
      </Switch>
    </div>
  }
}

ReactDOM.render(<BrowserRouter>
  <App/>
</BrowserRouter>, document.getElementById('app-container'));
