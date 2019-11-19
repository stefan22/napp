import React, {Component} from 'react'
import Pagination from './Pagination'
import Header from './layout/Header'
import Footer from './layout/Footer'
import List from './helpers/List'
import '../scss/components/gitlist.scss'
import GitUsersList from './GitUsersList'
import {GitAPI_searchUserRepos} from './helpers/GitApi'


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gitSearch: {},
      page: 1,
      nextPage: 0,
      totalPages: 0,
    }
  }

  updateGitList = (filtered) => {
    this.setState({gitSearch:{items: filtered}})
  }

  checkRenderType = (t,p) => (
    (t.type.toLowerCase() === p.toLowerCase()) ? p : false
  )

  handlePagination = (link) => {
    let lastLink = link.last
    let nextLink = link.next

    let brknlast = lastLink.split('=')
    let brknnext = nextLink.split('=')
    let lastPage = Number(brknlast.filter((lk,idx) => idx === brknlast.length -1))
    let nextPage = Number(brknnext.filter((lk,idx) => idx === brknnext.length -1))

    this.setState({
      nextPage,
      totalPages: lastPage
    })

    // let nums = document.querySelectorAll('.gp--page')
    // nums.forEach(n => {
    //   if(n.classList.includes('gp--page')) {


  }



  fetchGitData = async (usr,param='User') => {
    let filres = []
    //get filtered users search
    let response = await GitAPI_searchUserRepos(usr,param)
    console.log(response)
    response.items.filter(itm =>  //filtered out types
      this.checkRenderType(itm,param) ? filres.push(itm) : false
    )
    //update gitSearch state
    this.updateGitList(filres)
    this.handlePagination(response.headerLinks)
  }


  render() {
    const {gitSearch:{items},page,nextPage,totalPages} = this.state
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

        <Pagination
          page={page}
          nextPage={nextPage}
          totalPages={totalPages}
        />

        <Footer />
      </>
    )

  }

}

export default Dashboard
