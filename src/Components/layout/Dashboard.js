import React, {Component} from 'react'
import Header from './Header'
import Footer from './Footer'
import List from '../helpers/List'
import '../../scss/components/gitlist.scss'
import GitUsersList from '../GitUsersList'


const getUsers = user => (
  `https://api.github.com/search/users?q=${user}`
)

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  fetchGitData = async (usr) => {
    const response = await fetch(getUsers(usr))
    return (
      await response.json()
        .then(data => this.setState({data}))
    )
  }

  render() {
    const {data:{items}} = this.state
    console.log(items)


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
