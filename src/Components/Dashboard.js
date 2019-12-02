import React, {Component} from 'react'
//layout
import Header from './layout/Header'
import Footer from './layout/Footer'
//comps
import Pagination from './layout/Pagination'
import GitUsersList from './gitusers/GitUsersList'
import GitOrgInfo from './gitorgs/GitOrgInfo'
//helpers
import {
  GitAPI_searchUser,GitAPI_searchNextPrevPage,
  GitAPI_searchPage,GitAPI_searchOrg,GitAPI_orgRepos
} from './helpers/GitApi'
import getHeaderLinks from './helpers/getHeaderLinks'
import List from './helpers/List'
//styles
import '../scss/components/gitlist.scss'
import loadingBall from '../images/ball.gif'


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterBy: 'User',
      queryString: '',
      gitSearch: {
        users: 0,
        org: {},
        repos: 0,
      },
      page: 1,
      totalPages: 0,
      headerLinks: { prevLink: '', lastLink: '',
        nextLink: '', lastName: '', nextName: '', prevName: '',
      },
      results: 0,
      message: '',
      loading: false,
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
        users: [],
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
        loading: false,
      })
      return true
    }
    let isPage = (dir === 'next') ? nextName : prevName
    this.setState({//updt nx/prv pg
      totalPages: lastName,
      page: isPage, loading: false,
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

  updateGitList = (filtered,org) => {//debugger
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
        loading: false,
      })
    }
    if(filtered !== undefined) {
      this.setState({
        gitSearch:{users: filtered},
        totalPages: this.state.headerLinks.lastName,
        page: 1,
        message: '',
        queryString: '',
        loading: false,
        results: Number(filtered.length) * this.state.headerLinks.lastName,
      })
    }
  }

  checkRenderType = (t,p) => (
    (t.type.toLowerCase() === p.toLowerCase()) ? p : false
  )

  handlePagination = async (direction) => {
    const {headerLinks:{nextLink,prevLink}} = this.state
    const whichPage = (direction === 'next') ? nextLink : prevLink
    this.setState({loading: true})
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
    this.setState({loading: true})
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
    this.setState({loading: true})
    let response = await GitAPI_searchOrg(org)
    if(response !== undefined) {
      //search results
      this.updateGitList(response,'Organization')
      this.fetchGitOrgRepos(response.repos_url)
    }
    else {
      this.setState({
        message: 'No Results found',
        queryString: '',
        gitSearch: {
          org: '',
        },
        loading: false,
      })
    }
  }

  fetchGitOrgRepos = async (repos) => {
    let res = []
    let response = await GitAPI_orgRepos(repos)
    let pageLinks = response.headerLinks
    if(pageLinks !== undefined) {
      this.handleHeaderLinks(response)
      response.filter(itm =>  //filtered out types
        itm.next === undefined ? res.push(itm) : false
      )
      this.setState({repos: res,loading: false})
    }
  }

  fetchGitData = async (usr,param='User') => {
    if(usr === '') {
      return this.setState({
        gitSearch: {users: '',org: ''},
        totalPages: 1,
        page: 1,
        results: 0,
        message: '',
        queryString: '',
      })
    }
    let filres = []
    this.setState({loading: true})
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
          users: [],
        },
        loading: false,
      })
    }
  }


  render() {
    //console.log(this)
    const {
      headerLinks,
      gitSearch:{users,org}, queryString,
      page,totalPages,repos,message,results,filterBy,loading,
    } = this.state

    return (
      <>
        {
          (loading) ?
            <div className='gituser__loading'>
              <h3>Loading...</h3>
              <img src={loadingBall} alt='loading' width='256' height='256' />
            </div>
            :
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
                          !!users && filterBy === 'User' &&
                      <List
                        items={users}
                        item={GitUsersList}
                      />
                        }
                        {
                          filterBy === 'Organization' &&  message !== '' &&
                        <h3>{message}</h3>
                        }
                        {
                          !!org && filterBy === 'Organization' && !loading &&
                      <GitOrgInfo
                        org={org}
                        repos={repos}
                        loading={loading}
                        headerLinks={headerLinks}
                        lastName={headerLinks.lastName}
                        totalPages={totalPages}
                        queryString={queryString}
                        message={message}
                        page={page}
                        results={results}
                        fetchGitOrgRepos={this.fetchGitOrgRepos}
                      />
                        }

                      </div>
                    </div>
                  </div>
                </div>
              </main>
              {
                !!users && filterBy === 'User' &&
            <Pagination
              page={page}
              lastPage={headerLinks.lastName}
              handlePagination={this.handlePagination}
              fetchPageData={this.fetchPageData}
              totalPages={totalPages}
            />
              }
              <Footer />
            </>
        }
      </>
    )

  }

}

export default Dashboard
