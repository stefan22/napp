import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import List from './helpers/List'
import ReposTable from './ReposTable'
import Footer from '../Components/layout/Footer'
import {GitApiUserStats,GitApiReposUrl, GitApiRepos} from './helpers/GitApi'
import logo__white from '../images/logo-one-try__white.png'
import '../scss/components/gituser.scss'
import loadingBall from '../images/ball.gif'


class GitUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      gitSingle: {
        name: '',
        repos: {
          items: []
        },
      },
      totalPages: 0,
      page: 1,
      loading: true,
    }

    this.fetchRepos = this.fetchRepos.bind(this)
  }

  appendData = (login,type) => {//<= need meta link for pagination
    let script = document.createElement('script')
    script.id = 'cb'
    script.src = this.fetchRepos(login,type)
    script.type = 'text/babel'
    console.log(script)
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  componentDidMount = async () => {
    const {login,type} = this.props.history.location
    this.appendData(login,type)
    //showing data from here
    let usr = await fetch(GitApiUserStats(login))
    return (
      await usr.json()
        .then(user => this.setState({user}))
        .catch(err => console.log(err)),
      //nx repos
      this.showReposData(login,type) //repos
    )
  }


  fetchRepos(usr,param='User') {//jsonp
    const getRepos = new Request(GitApiReposUrl(usr,param), {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    fetch(getRepos).then(response => response.text())
      .then(body => {
        let data = body
        console.log(data)
        let meta = body['meta']
        console.log(meta)
        return data
      })
  }

  showReposData = async (usr,param='User') => {
    const repos = await fetch(GitApiRepos(usr,param))
    return (
      await repos.json()
        .then(reps => this.setState({//add repos state
          gitSingle: {
            name: usr,
            type: param,
            repos: {
              items: reps,
            },
          },loading: false,
        }))
    )
  }



  render() {

    window.appendData = data => {
      console.log(data)
    }

    const {user,gitSingle:{repos:{items}},loading} = this.state

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
                        <h3><span>Location:</span> {(user.location) ?
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

                    <div className='gituser__pagination'>
                      <div className='pagination__wrapper'>
                        <Link to='' className='gp--page'>&laquo;</Link>
                        <Link to='' className='gp--active'>1</Link>
                        <Link to='' className='gp--page'>2</Link>
                        <Link to='' className='gp--page'>3</Link>
                        <Link to='' className='gp--page'>4</Link>
                        <Link to='' className='gp--page'>5</Link>
                        <Link to='' className='gp--page'>6</Link>
                        <Link to='' className='gp--page'>&raquo;</Link>
                      </div>
                    </div>


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
