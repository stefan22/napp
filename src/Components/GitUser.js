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

    console.log(this)

    return (
      <>
        <header>
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
                <h2>Git-username: {user.name}</h2>
                <h4>Location: {user.location}</h4>
                <h4>Blog: {user.blog}</h4>
                <h4>Company: {user.company}</h4>
              </div>
            </div>

            <div className='gituser__bottom'>
              <div className='gituser__pic'>
                <img src={user.avatar_url} width={250} height={250} alt={user.name} />
                <div className='gituser__stats'>
                  <p>Followers: {user.followers}</p>
                  <p>Following: {user.following}</p>
                  <p>Gits Id:{user.gits_url}</p>
                  <p>Repos: {user.public_repos}</p>
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
