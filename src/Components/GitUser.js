import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Footer from '../Components/layout/Footer'
import {GitApiUser} from './helpers/GitApi'
import logo__white from '../images/logo-one-try__white.png'
import '../scss/components/gituser.scss'


class GitUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount = async () => {
    const gu = this.props.location.login
    let usr = await fetch(GitApiUser(gu))
    return (
      await usr.json()
        .then(user => this.setState({user}))
    )
  }

  render() {
    const {user} = this.state

    return (
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
              <div className='gituser__intro'>
                <h1>GitHub User</h1>
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
            </div>

            <div className='gituser__bottom'>
              <div className='gituser__pic'>
                <img src={user.avatar_url} width={250} height={250} alt={user.name} />
                <div className='gituser__stats'>
                  <p><span>GitHub Followers:</span> {user.followers}</p>
                  <p><span>GitHub Following:</span> {user.following}</p>
                  <p><span>GitHub Id:</span> {user.id}</p>
                  <p><span>GitHub Repos:</span> {user.public_repos}</p>
                </div>
              </div>
            </div>

          </section>
        </div>
        <Footer />
      </>
    )
  }

}

export default (withRouter)(GitUser)
