import React, {Component} from 'react'
//layout
import Header from './layout/Header'
import Footer from './layout/Footer'
//comps
import Pagination from './Pagination'
import GitUsersList from './GitUsersList'
import GitOrgInfo from './GitOrgInfo'
//helpers
import {
  GitAPI_searchUser,GitAPI_searchNextPrevPage,GitAPI_searchPage,GitAPI_searchOrg
} from './helpers/GitApi'
import getHeaderLinks from './helpers/getHeaderLinks'
import List from './helpers/List'
//styles
import '../scss/components/gitlist.scss'


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterBy: 'User',
      queryString: '',
      gitSearch: {
        items: 0,
        org: '',
      },
      page: 1,
      totalPages: 0,
      headerLinks: { prevLink: '', lastLink: '',
        nextLink: '', lastName: '', nextName: '', prevName: '',
      },
      results: 0,
      message: '',
    }
    this.handleFilter = this.handleFilter.bind(this)
    this.handleSearchQuery = this.handleSearchQuery.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSearchQuery(e) {
    e.preventDefault()
    const {filterBy,queryString} = this.state
    if (filterBy === 'Organization' && queryString !== '') {
      return this.fetchGitOrgData(queryString)
    }
    this.fetchGitData(queryString)
  }

  handleFilter(e) {
    //console.log(e.target.value)
    this.setState({
      gitSearch: {
        org: '',
        items: 0,
      },
      filterBy: e.target.value,
      queryString: '',
      message: '',
      results: '',
    })
  }

  handleChange(event) {
    const query = event.target
    if(event.type === 'focus') {
      query.value = ''
      event.target.placeholder = 'Enter search parameter..'
    }
    else if(event.type === 'blur') {
      event.target.placeholder = 'Press enter to clear results'
      query.value = ''
    }
    else if(event.key === 'Enter') {
      this.setState({
        queryString: (query.value !== '') ? query.value : '',
      })
    }
  }

  shouldComponentUpdate(nextProps) {
    //filterBy changed state
    return nextProps.filterBy !== this.state.filterBy
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
    if(typeof dir === 'number') {//updt pg num
      this.setState({
        totalPages: lastName || prevName + 1,
        page: dir,
      })
      return true
    }
    let isPage = (dir === 'next') ? nextName : prevName
    this.setState({//updt nx/prv pg
      totalPages: lastName,
      page: isPage,
    })
  }

  get getResults() {
    return (
      <div
        className="results-found">
        {`Found ${this.state.results} results in ${this.state.totalPages} pages`}
      </div>
    )
  }

  updateGitList = (filtered,org) => {
    org = org || undefined
    if(org === 'Organization') {
      return this.setState({
        gitSearch: {
          org: filtered,
        },
        totalPages: 1,
        page: 1,
        results: 1,
        message: '',
        queryString: '',
      })
    }
    this.setState({
      gitSearch:{items: filtered},
      totalPages: this.state.headerLinks.lastName,
      page: 1,
      message: '',
      queryString: '',
      results: Number(filtered.length) * this.state.headerLinks.lastName,
    })
  }

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

  fetchPageData = async (pg) => {
    let handle = this.state.headerLinks.lastLink || this.state.headerLinks.prevLink
    let rem = handle.indexOf('page=28')
    handle = handle.slice(0, rem + 13)
    let pageData = await GitAPI_searchPage(handle,pg)
    let pageItems = pageData.items
    let pageLinks = pageData.headerLinks
    if(pageLinks !== undefined) { //update gitSearch state
      this.updateGitList(pageItems)
      this.updatePage(pg)
      this.handleHeaderLinks(pageData)
    }
  }

  fetchGitOrgData = async (org) => {
    let response = await GitAPI_searchOrg(org)
    //console.log(response)
    if(response !== undefined) {
      //search results
      this.updateGitList(response,'Organization')
    }
    else {
      this.setState({
        message: 'No Results found',
        queryString: '',
        gitSearch: {
          org: '',
        },
      })
    }
  }

  fetchGitData = async (usr,param='User') => {
    //no results empty str & clear results
    if(usr === '') {
      return this.setState({
        gitSearch: {
          items: '',
          org: '',
        },
        totalPages: 1,
        page: 1,
        results: 0,
        message: '',
        queryString: '',
      })
    }
    let filres = []
    let response = await GitAPI_searchUser(usr,param)
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
        queryString: '',
        gitSearch: {
          items: 0,
        },
      })
    }
  }


  render() {
    //console.log(this)
    const {
      gitSearch:{items,org},
      headerLinks:{lastName},
      page,totalPages,message,results,filterBy
    } = this.state

    return (
      <>
        <Header
          fetchGitData={this.fetchGitData}
          results={results}
          filterBy={filterBy}
          matchingResuls={this.getResults}
          handleFilter={this.handleFilter}
          handleChange={this.handleChange}
          handleSearchQuery={this.handleSearchQuery}
        />

        <main>
          <div id='main-content'>
            <div className={`${(org) ? 'maincenter org' : 'maincenter'}`}>
              <div className='gitinner'>
                <div className='git-row'>
                  {
                    filterBy === 'User' && message !== '' &&
                      <h3>{message}</h3>
                  }
                  {
                    !!items &&
                    <List
                      items={items}
                      item={GitUsersList}
                    />
                  }
                  {
                    filterBy === 'Organization' &&  org.id === undefined &&
                      <h3>{message}</h3>
                  }
                  {
                    !!org && filterBy === 'Organization' &&
                    <GitOrgInfo
                      org={org}
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
            fetchPageData={this.fetchPageData}
            totalPages={totalPages}
          />
        }

        <Footer />
      </>
    )

  }

}

export default Dashboard
