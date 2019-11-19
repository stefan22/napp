import React, {Component} from 'react'
import Pagination from './Pagination'
import Header from './layout/Header'
import Footer from './layout/Footer'
import List from './helpers/List'
import '../scss/components/gitlist.scss'
import GitUsersList from './GitUsersList'
import {GitAPI_searchUserRepos,GitAPI_searchNextPage} from './helpers/GitApi'


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gitSearch: {},
      page: 1,
      pageName: undefined,
      totalPages: 0,
      headerLinks: {
        lastLink: '',
        nextLink: '',
        lastName: '',
        nextName: '',
        prevName: '',

      }
    }
  }

  getHeaderLinks = link => {
    let brknprevName,brknlastName,brknnextName

    if(typeof link === 'object') {
      //links
      let brknprevLink = link.prev || undefined
      let brknlastLink = link.last || undefined
      let brknnextLink = link.next || undefined

      let brknprev = brknprevLink !== undefined ? brknprevLink.split('=') : undefined
      let brknlast = brknlastLink.split('=')
      let brknnext = brknnextLink.split('=')
      //names
      if(brknprev !== undefined) {
        brknprevName = Number(brknprev.filter((lk,idx) => idx === brknprev.length -1))
      }
      if (brknlast !== undefined) {
        brknlastName = Number(brknlast.filter((lk,idx) => idx === brknlast.length -1))
      }
      if(brknnext !== undefined) {
        brknnextName = Number(brknnext.filter((lk,idx) => idx === brknnext.length -1))
      }

      this.setState(prevState => ({
        headerLinks: {
          prevLink: (brknprevLink !== prevState.headerLinks.prevLink) ?
            brknprevLink : prevState.headerLinks.prevLink,
          nextLink: (brknnextLink !== prevState.headerLinks.nextLink) ?
            brknnextLink : prevState.headerLinks.nextLink,
          lastLink: (brknlastLink !== prevState.headerLinks.lastLink) ?
            brknlastLink : prevState.headerLinks.lastLink,

          prevName: (brknprevName !== prevState.headerLinks.prevName) ?
            brknprevName : prevState.headerLinks.prevName,
          nextName: (brknnextName !== prevState.headerLinks.nextName) ?
            brknnextName : prevState.headerLinks.nextName,
          lastName: (brknlastName !== prevState.headerLinks.lastName) ?
            brknlastName : prevState.headerLinks.lastName,

        }
      }))
    }
  }

  handlePagination = async (direction) => {
    const {headerLinks:{nextLink,prevLink}} = this.state
    const whichPage = (direction === 'next') ? nextLink : prevLink
    let pageData = await GitAPI_searchNextPage(whichPage)
    let pageItems = pageData.items
    let pageLinks = pageData.headerLinks
    if(pageLinks !== undefined) { //update gitSearch state
      this.updateGitList(pageItems)
      this.updatePage(direction)
      this.getHeaderLinks(pageLinks)
    }
  }

  updatePage = (dir) => {
    const {headerLinks:{lastName,nextName,prevName}} = this.state
    let isPage = (dir === 'next') ? nextName : prevName
    this.setState({
      totalPages: lastName,
      page: isPage,
    })
  }


  updateGitList = (filtered) => (
    this.setState({
      gitSearch:{items: filtered},
      totalPages: this.state.headerLinks.lastName,
    })
  )

  checkRenderType = (t,p) => (
    (t.type.toLowerCase() === p.toLowerCase()) ? p : false
  )

  fetchGitData = async (usr,param='User') => {
    let filres = []
    let response = await GitAPI_searchUserRepos(usr,param)
    this.getHeaderLinks(response.headerLinks)
    //search results
    if(response !== undefined) {
      response.items.filter(itm =>  //filtered out types
        this.checkRenderType(itm,param) ? filres.push(itm) : false
      )
      //update gitSearch state
      this.updateGitList(filres)
    }
  }


  render() {
    const {gitSearch:{items},page,totalPages} = this.state
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
        {
          !!items &&
          <Pagination
            page={page}
            handlePagination={this.handlePagination}
            totalPages={totalPages}
          />
        }

        <Footer />
      </>
    )

  }

}

export default Dashboard
