import React, {Component} from 'react'
import Header from './Header'
import Footer from './Footer'
import List from '../helpers/List'
import '../../scss/components/gitlist.scss'
import GitUsersList from '../GitUsersList'
import {GitApiUsers} from '../helpers/GitApi'


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  fetchGitData = async (usr) => {
    const response = await fetch(GitApiUsers(usr))
    return (
      await response.json()
        .then(data => this.setState({data}))
    )
  }

  render() {
    const {data:{items}} = this.state

    return (
      <>
        <Header
          fetchGitData={this.fetchGitData}
        />

        <main>
          <div id='main-content'>
            <div className='maincenter'>
              <div className='gitinner'>
                <div className='git-row'>

                  {!!items &&
                <List
                  items={items}
                  item={GitUsersList}
                />
                  }
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />

      </>
    )

  }

}

export default Dashboard
