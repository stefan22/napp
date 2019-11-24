import React, {Component} from 'react'
//comps
import SearchContainer from '../SearchContainer'
//styles
import '../../scss/components/header.scss'
import logo__white from '../../images/logo-one-try__white.png'


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      didScroll: false,
      lastScrolledTop: 0,
    }
    this.hasScrolled = this.hasScrolled.bind(this)
    this.scrollNavigation = this.scrollNavigation.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollNavigation, false)
  }

  scrollNavigation(e) {
    const {didScroll} = this.state
    let scrolledAmount = e.target.scrollingElement.scrollTop
    this.hasScrolled(scrolledAmount)
    if(didScroll) {
      this.setState(() => ({didScroll: false}))
    }
  }

  hasScrolled = scrolledAmount => {
    const {lastScrolledTop} = this.state
    const header = document.querySelector('header > div')
    if(scrolledAmount > 70) {
      this.setState({
        lastScrolledTop: scrolledAmount,
        didScroll: true,
      })
      header.classList.add('headsup')
    }
    else if(scrolledAmount <= lastScrolledTop) header.classList.remove('headsup')
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollNavigation)
  }

  render() {
    const home = window.location.pathname
    const {
      results,matchingResuls,filterBy,
      handleChange,handleFilter,handleSearchQuery,goBack} = this.props

    return (

      <header>
        <div className={'topnav-container'}>

          <div className={`
            ${(home === '/') ? 'topnav-logo' : 'topnav-logo gituser-header'}`}>
            <img src={logo__white} alt='logo' />
          </div>
          <div className={`${(home === '/') ? 'topnav-link' : 'topnav-link gituser'}`}>
            <p>GitHub</p>
          </div>
          {
            home !== '/' &&
            <div className='topnav-link goback'>
              <button
                onClick={goBack}>Go Back</button>
            </div>
          }
        </div>

        {
          home === '/' ?
            <SearchContainer
              filterBy={filterBy}
              results={results}
              handleFilter={handleFilter}
              matchingResuls={matchingResuls}
              handleSearchQuery={handleSearchQuery}
              handleChange={handleChange}
            />
            : false
        }

      </header>
    )
  }

}

export default Header
