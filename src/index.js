import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import './scss/global.css'
import App from './Components/App'
import ScrollToTop from './Components/helpers/ScrollToTop'


ReactDOM.render(

  <Router>
    <ScrollToTop />
    <App />
  </Router>,

  document.getElementById('root'))
