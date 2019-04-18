import React from 'react';
import Components from '../src/config/componentConfig'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import setIcon from './config/iconConfig'
import TW from '../lib/main'
import { Notification } from '../lib/main'
import './App.css';
console.log(TW)
console.log(Notification)
Notification.success({ msg: '231312' })
export default (props => {
  window.onload = () => {
    setIcon()
  }
  return(
    <div className='componentContainer'>
      <Router>
        <span style={{display: 'flex'}}>
        <div className='componentList'>
          {
            Components.config.map(item => (
                <NavLink to={item.path} key={item.name}>{item.name}</NavLink>
            ))
          }
        </div>
        {
          Components.config.map(item => (
            <Route key={item.name} className='__componentDetail' path={item.path} component={() =>
              <div className='rightComponent'>{item.component()}</div>} />
          ))
        }
        </span>
      </Router>
    </div>
  )
})