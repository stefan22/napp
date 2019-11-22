import React, {Component} from 'react'
//layout
import Header from './layout/Header'
import Footer from './layout/Footer'
//comps
import Pagination from './Pagination'
import GitUsersList from './GitUsersList'
//helpers
import {GitAPI_searchUserRepos,GitAPI_searchNextPrevPage} from './helpers/GitApi'
import getHeaderLinks from './helpers/getHeaderLinks'
import List from './helpers/List'
//styles
import '../scss/components/gitlist.scss'


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gitSearch: {
        items: 0,
      },
      page: 1,
      totalPages: 0,
      headerLinks: { prevLink: '', lastLink: '',
        nextLink: '', lastName: '', nextName: '', prevName: '',
      }
    }
  }


  handleHeaderLinks = (response) => {
    let headers = getHeaderLinks(response.headerLinks)
    const {lastLink,nextLink,prevLink,lastName,nextName,prevName} = headers
    return (
      this.setState({headerLinks: {
        lastLink,nextLink,prevLink,prevName,nextName,lastName,
      }})
    )
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
      page: 1,
    })
  )

  checkRenderType = (t,p) => (
    (t.type.toLowerCase() === p.toLowerCase()) ? p : false
  )

  handlePagination = async (direction) => {
    const {headerLinks:{nextLink,prevLink}} = this.state
    const whichPage = (direction === 'next') ? nextLink : prevLink
    let pageData = await GitAPI_searchNextPrevPage(whichPage)
    let pageItems = pageData.items
    let pageLinks = pageData.headerLinks
    if(pageLinks !== undefined) { //update gitSearch state
      this.updateGitList(pageItems)
      this.updatePage(direction)
      this.handleHeaderLinks(pageData)
    }
  }

  fetchGitData = async (usr,param='User') => {
    let filres = []
    let response = await GitAPI_searchUserRepos(usr,param)
    if(response !== undefined) {
      //search results
      this.handleHeaderLinks(response)
      response.items.filter(itm =>  //filtered out types
        this.checkRenderType(itm,param) ? filres.push(itm) : false
      )
      //update gitSearch state
      this.updateGitList(filres)
    }
    else {
      console.log('No search results match criteria')
      this.setState({
        message: 'No Results found',
        gitSearch: {
          items: 0,
        },
      })
    }
  }


  render() {
    console.log(this)
    const {gitSearch:{items},headerLinks:{lastName},page,totalPages,message} = this.state
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
                    items === 0 &&
                      <h3>{message}</h3>
                  }
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
            lastName={lastName}
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
