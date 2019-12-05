import React from 'react'
import Dashboard from './Dashboard'
import GitUser from './gitusers/GitUser'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import '../scss/components/header.scss'
import donPioPath from './helpers/donPioPath'
import OrgRepos from './gitorgs/OrgRepos'


const App = () => (

  <Router>
    <Switch>
      <Route path={donPioPath()}
        component={Dashboard} exact
      />
      <Route path={'/gituser/:id'} exact
        component={GitUser}
      />
      <Route path={'/gitorg/:id'} exact
        component={OrgRepos}
      />
    </Switch>
  </Router>

)

export default App
