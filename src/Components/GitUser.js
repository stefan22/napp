import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
//comps
import Pagination from './Pagination'
import ReposTable from './ReposTable'
//layout
import Header from '../Components/layout/Header'
import Footer from '../Components/layout/Footer'
//helpers
import List from './helpers/List'
import {GitApi_userRepos,GitAPI_searchNextPrevPage,url,GitAPI_reposPage} from './helpers/GitApi'
import getHeaderLinks from './helpers/getHeaderLinks'
//styles
import '../scss/components/gituser.scss'
import loadingBall from '../images/ball.gif'



class GitUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      gitSingle: {
        type: '',
        repos: {
          items: 0
        },
      },
      page: 1,
      totalPages: 1,
      headerLinks: { prevLink: '', lastLink: '',
        nextLink: '', lastName: '', nextName: '', prevName: '',
      },
      loading: true,
    }
  }


  componentDidMount() {
    const {login} = this.props.history.location
    this.getUserRepos(login)
    fetch(`${url}/users/${login}`)
      .then(usr => usr.json())
      .then(user => this.setState({user}))
  }

  handleHeaderLinks = (response) => {
    if(response.headerLinks === undefined) {
      this.setState({headerLinks: {
        lastName: 1
      }})
      return true
    }
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
         page: dir || prevName,
       })
       return true
     }
     let isPage = (dir === 'next') ? nextName : prevName
     this.setState({
       totalPages: lastName,
       page: isPage,
     })
   }

  updateGitList = (filtered) => (
    this.setState({
      gitSingle:{
        type: 'user',
        repos: {
          items: filtered
        }
      },
      totalPages: this.state.headerLinks.lastName,
      loading: false,
    })
  )

  handlePagination = async (direction) => {
    const {headerLinks:{nextLink,prevLink}} = this.state
    const whichPage = (direction === 'next') ? nextLink : prevLink
    this.setState({loading: true})
    let pageData = await GitAPI_searchNextPrevPage(whichPage)
    let pageItems = pageData.filter(itm => itm !== pageData.headerLinks )
    let pageLinks = pageData.headerLinks
    if(pageLinks !== undefined) { //update gitRepos state
      this.updatePage(direction)
      this.updateGitList(pageItems)
      this.handleHeaderLinks(pageData)
    }
  }

  fetchPageData = async (pg) => {
    let handle = this.state.headerLinks.lastLink  || this.state.headerLinks.prevLink
    let rem = handle.indexOf('page=')
    handle = handle.slice(0,rem+5)
    this.setState({loading: true})
    let pageData = await GitAPI_reposPage(handle,pg)
    let pageItems = pageData
    let pageLinks = pageData.headerLinks
    if(pageLinks !== undefined) { //update gitSearch state
      this.updateGitList(pageItems)
      this.updatePage(pg)
      this.handleHeaderLinks(pageData)
    }
  }

  getUserRepos = async (usr) => {
    let reps = []
    let repos = await GitApi_userRepos(usr)
    if(repos !== undefined) {
      this.handleHeaderLinks(repos)
      repos.filter(itm => itm !== itm.headerLinks ? reps.push(itm) : false)
      //update gitRepos state
      this.updateGitList(reps)
    }
  }

  render() {
    //console.log(this)
    const {
      user,
      gitSingle:{repos:{items}},headerLinks:{lastName},loading,page,totalPages} = this.state

    const {goBack} = this.props.history

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
                goBack={goBack}
              />

              <div className='gituser__page'>
                <section className='gituser__section'>
                  <div className='gituser__header'>
                    <div className='gituser__left'></div>
                    <div className='gituser__intro'>
                      <h1>
                        GitHub {user.type || 'User'}
                      </h1>
                      <div className='gituser__info'>
                        <h3><span>Username:</span> {user.name}</h3>
                        <h3><span>Location:</span>
                          {(user.location) ? user.location : 'Not Available'}</h3>
                        <h3>
                          <span>Blog:</span> {
                            (user.blog) ?
                              <a rel="noopener noreferrer"
                                href={user.blog}
                                target='_blank'
                              >
                                {user.name.split(' ')[0] + '\'s blog'}
                              </a>
                              : 'Not Available'
                          }</h3>
                        <h3>
                          <span>Company:</span>
                          {user.company || 'Not Available'}</h3>
                        <h3><span>GitHub:</span>{
                          (user.url) ?
                            <a
                              rel="noopener noreferrer"
                              href={user.html_url}
                              target='_blank'
                            >
                              {user.login}
                            </a>
                            : 'Not Available'
                        }</h3>
                      </div>
                    </div>
                    <div className='gituser__right'>
                      <img src={user.avatar_url} width={290} height={290} alt={user.name} />
                      <div className='gituser__stats'>
                        <p><span>GitHub Followers:</span> {user.followers}</p>
                        <p><span>GitHub Following:</span> {user.following}</p>
                        <p><span>GitHub Id:</span> {user.id}</p>
                        <p><span>GitHub Repos:</span> {user.public_repos}</p>
                      </div>
                    </div>

                  </div>
                  <div className='repos'>
                    <h2>Repo Court</h2>
                    <div className='repos-wrapper'>
                      <table id='repos-table' cellPadding={3} cellSpacing={3}>
                        <thead>
                          <tr>
                            <td align='left' className='repo__created'>Created</td>
                            <td align='left'>Name</td>
                            <td align='left'>Description</td>
                            <td align='left'>Language</td>
                            <td align='left'>Username</td>
                            <td align='left'>Forks</td>
                          </tr>
                        </thead>
                        <tbody>

                          {
                            !!items &&
                              <List
                                user={user.login}
                                items={items}
                                item={ReposTable}
                              />
                          }

                        </tbody>
                      </table>
                    </div>

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

                  </div>
                </section>
              </div>
              <Footer />
            </>
        }
      </>
    )
  }

}

export default (withRouter)(GitUser)
