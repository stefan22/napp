import React, { Component } from 'react'
import Layout from './layout/Layout'


class App extends Component {
  render() {
    return (
      <Layout>
        <div id='main-content'>
          <div className='mainleft'>
            mainleft
          </div>
          <div className='maincenter'>
            maincenter
          </div>
          <div className='mainright'>
            mainright
          </div>
        </div>
      </Layout>
    )
  }
}

export default App
