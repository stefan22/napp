import React from 'react'
import Dashboard from './layout/Dashboard'
import GitUser from './GitUser'
import {Route, Switch} from 'react-router-dom'
import '../scss/components/header.scss'


const App = () => (

  <Switch>

    <Route path={'/'}
      component={Dashboard} exact
    />
    <Route path={'/gituser/:id'} exact
      component={GitUser}
    />

  </Switch>

)

export default App
