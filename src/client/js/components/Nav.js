import React from 'react';
import {Link, NavLink} from 'react-router-dom'

const routesList =  [
  {routeText: 'Jobs' , destination: '/jobs' },
  {routeText: 'Companies' , destination: '/companies' },
  {routeText: 'Log In' , destination: '/login' },
  {routeText: 'Sign Up' , destination: '/register' }
]

export default class Nav extends React.Component {
  _navLinkJsx (rObj, i) {
    return <NavLink
      activeClassName="nav__link--selected"
      className="nav__link nav__link-register"
      to={rObj.destination}
      key={i+rObj.destination}
      >
      {rObj.routeText}
    </NavLink>
  }

  render(){
    return   <div className="navbar">
        <div>
          <a className="nav__link nav__link-home" href="/">&lt; <i className="ion-ios-home-outline"/> &gt;</a>
        </div>
        <div>
          {routesList.map(this._navLinkJsx)}
        </div>
      </div>
  }
}
