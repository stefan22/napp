import React from 'react'
import Dashboard from './Dashboard'
import GitUser from './GitUser'
import {Route, Switch} from 'react-router-dom'
import '../scss/components/header.scss'
import donPioPath from './helpers/donPioPath'
import OrgRepos from './OrgRepos'


const App = () => (

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

)

export default App
