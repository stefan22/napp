import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Pagination from './Pagination'
import List from './helpers/List'
import ReposTable from './ReposTable'
import Footer from '../Components/layout/Footer'
import {GitApi_userRepos,GitAPI_searchNextPrevPage,url} from './helpers/GitApi'
import logo__white from '../images/logo-one-try__white.png'
import '../scss/components/gituser.scss'
import loadingBall from '../images/ball.gif'


class GitUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      gitSingle: {
        repos: {
          items: 0
        },
      },
      totalPages: 0,
      page: 1,
      loading: true,
      headerLinks: { prevLink: '', lastLink: '',
        nextLink: '', lastName: '', nextName: '', prevName: '',
      }
    }
  }


  componentDidMount() {
    const {login} = this.props.history.location
    console.log(login)
    this.getUserRepos(login)
    fetch(`${url}/users/${login}`)
      .then(usr => usr.json())
      .then(user => this.setState({user}))
  }

  getHeaderLinks = link => {
    let brknprevName,brknlastName,brknnextName,brknprevLink,brknprev
    if(typeof link === 'object') {
      if(link.prev !== undefined) {
        brknprevLink = link.prev//links
        brknprev = brknprevLink !== undefined ? brknprevLink.split('=') : undefined
        brknprevName = Number(brknprev.filter((lk,idx) => idx === brknprev.length -1))
      }
      if (link.last !== undefined) {
        let brknlastLink = link.last
        console.log('=>  ',brknlastLink)

        let brknlast = brknlastLink !== undefined ? brknlastLink.split('=') : undefined
        brknlastName = Number(brknlast.filter((lk,idx) => idx === brknlast.length -1))
      }
      if(link.next !== undefined) {
        let brknnextLink = link.next
        let brknnext = brknnextLink !== undefined ? brknnextLink.split('=') : undefined
        brknnextName = Number(brknnext.filter((lk,idx) => idx === brknnext.length -1))
      }

      return (
        this.setState({
          headerLinks: {prevLink: link.prev,nextLink: link.next,lastLink: link.last,
            prevName: brknprevName,nextName: brknnextName,lastName: brknlastName,
          }
        })
      )
    }
  }

  handlePagination = async (direction) => {
    const {headerLinks:{nextLink,prevLink}} = this.state
    const whichPage = (direction === 'next') ? nextLink : prevLink
    let pageData = await GitAPI_searchNextPrevPage(whichPage)
    let pageItems = pageData.items
    let pageLinks = pageData.headerLinks
    if(pageLinks !== undefined) { //update gitSearch state
      this.updatePage(direction)
      this.updateGitList(pageItems)
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
      gitSingle:{
        repos: {
          items: filtered
        }
      },
    })
  )

  getUserRepos = async (usr) => {//debugger
    console.log(usr)
    let reps = []
    let repos = await GitApi_userRepos(usr)
    console.log(repos)


    if(repos !== undefined) {
      // if(repos.length === 28) {
      //   console.log(repos.length)
      //   this.getHeaderLinks(repos.headerLinks)
      // }
      console.log(repos)
      repos.filter(itm => itm !== itm.headerLinks ? reps.push(itm) : false)
      console.log(reps)
      this.setState({
        gitSingle: {
          type: 'user',
          repos: {
            items: reps,
          },
        },
        loading: false,
        totalPages: this.state.headerLinks.lastName,
        page: 1,
      })
    }
  }

  render() {
    console.log(this)

    const {
      user,
      gitSingle:{repos:{items}},
      loading,page,totalPages} = this.state

    console.log(totalPages,items)

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
              <header className='gituser-header'>
                <div className='topnav-container gituser'>
                  <div className='topnav-logo'>
                    <img src={logo__white} alt='logo' />
                  </div>
                  <div className='topnav-link goback'>
                    <button onClick={this.props.history.goBack}>Go Back</button>
                  </div>
                </div>
              </header>

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
                        <h3><span>Location:</span> {(user.login) ?
                          user.location :
                          'Not Available'}</h3>
                        <h3>
                          <span>Blog:</span> {
                            (user.blog) ? user.blog : 'Not Available'
                          }</h3>
                        <h3><span>Company:</span> {(user.company) ? user.company :
                          'Not Available'}</h3>
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
                            <td align='left'>Id</td>
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
                        handlePagination={this.handlePagination}
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
