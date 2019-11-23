import React, {Component} from 'react'
import '../../scss/components/header.scss'
import logo__white from '../../images/logo-one-try__white.png'


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      didScroll: false,
      lastScrolledTop: 0,
      queryString: '',
      filterBy: 'User',
    }
    this.hasScrolled = this.hasScrolled.bind(this)
    this.scrollNavigation = this.scrollNavigation.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearchQuery = this.handleSearchQuery.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
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

  handleChange(event) {
    const query = event.target
    if(event.type === 'focus') {
      query.value = ''
      event.target.placeholder = 'Enter search parameter..'
    } else if(event.type === 'blur') {
      query.value = ''
      event.target.placeholder = 'Search..'
    } else if(event.key === 'Enter') {
      this.setState({
        queryString: query.value,
      })
    }
  }

  handleFilter(e) {
    this.setState({
      filterBy: e.target.value,
    })
  }

  handleSearchQuery(e) {
    e.preventDefault()
    const {filterBy} = this.state
    this.props.fetchGitData(
      this.state.queryString,
      filterBy
    )
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollNavigation)
  }

  render() {

    const {filterBy} = this.state
    const {results,matchingResuls} = this.props

    return (

      <header>
        <div className='topnav-container'>
          <div className='topnav-logo'>
            <img src={logo__white} alt='logo' />
          </div>
          <div className='topnav-link'>
            <p>GitHub</p>
          </div>
        </div>

        <div className='search-container'>
          <div className='search-container-inner'>
            <h2 className='search-container__title'>
              Git Search By
              <span>{filterBy}</span>
            </h2>
            <form
              onSubmit={this.handleSearchQuery}
              className='search-form'>
              <input
                onBlur={this.handleChange}
                onFocus={this.handleChange}
                onKeyDown={this.handleChange}
                className='search-form__input'
                type='text' name='search'
              />

              <div className='search-filters'>
                <div className='radio-container'>
                  Filter by:
                  <label className='radio-label'>
                    <input
                      onChange={this.handleFilter}
                      type='radio'
                      value={'User'}
                      checked={(filterBy === 'User')}
                      name='radio' id='username'
                    />
                    <span className='now-radio'></span>
                    <span className='islabel'>Username</span>
                  </label>
                  <label className='radio-label'>
                    <input
                      onChange={this.handleFilter}
                      type='radio'
                      value={'Organization'}
                      checked={(filterBy === 'Organization')}
                      name='radio' id='organization' />
                    <span className='now-radio'></span>
                    <span className='islabel'>Organization</span>
                  </label>
                </div>
              </div>
            </form>
          </div>
          {
            !!results &&
            matchingResuls
          }
        </div>
      </header>
    )
  }

}

export default Header
