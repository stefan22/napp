import React, {Component} from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import List from './helpers/List'
import '../scss/components/gitlist.scss'
import GitUsersList from './GitUsersList'
import {GitApiSearcAll} from './helpers/GitApi'


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gitSearch: {},
    }
  }

  updateGitList = (filtered) => {
    this.setState({gitSearch:{items: filtered}})
  }

  checkRenderType = (t,p) => (
    (t.type.toLowerCase() === p.toLowerCase()) ? p : false
  )

  fetchGitData = async (usr,param='User') => {
    let filres = []
    //get filtered search
    let response = await fetch(GitApiSearcAll(usr,param))
    response = await response.json()
    response.items.filter(itm =>  //filtered out types
      this.checkRenderType(itm,param) ? filres.push(itm) : false
    )
    //update gitSearch state
    this.updateGitList(filres)
  }


  render() {
    const {gitSearch:{items}} = this.state
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
                  {
                    !!items &&
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
