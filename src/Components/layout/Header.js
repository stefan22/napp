import React, { Component } from 'react'
//comps
import SearchContainer from '../gitsearch/SearchContainer'
//styles
import '../../scss/components/header.scss'
import logo__white from '../../images/logo-one-try__white.png'
import donPioPath from '../helpers/donPioPath'



class Header extends Component {
  constructor(props) {
    super(props)
    this.scrollTopRef = React.createRef();
  }



  scrollToTop = () => {
    window.scrollTo(0,this.scrollTopRef.current.offsetTop);
  }

 

  render() {
    const pathName = window.location.pathname
    const {
      results, matchingResuls, filterBy,
      handleChange, handleFilter, handleSearchQuery, goBack } = this.props



    return (

      <header>
        <div ref={this.scrollTopRef} className={'topnav-container'}>

          <div className={`
           ${(donPioPath === pathName) ?
              'topnav-logo' : 'topnav-logo gituser-header'}
        
        `}>
            <img src={logo__white} alt='logo' />
          </div>
          <div className={`
           ${(donPioPath === pathName) ? 'topnav-link' : 'topnav-link gituser'}
           
          `}>

            <p>GitHub</p>
          </div>
          {
            (donPioPath !== pathName) ?
              <div className='topnav-link goback'>
                <button
                  onClick={goBack}>Go Back</button>
              </div>
              : false
          }
        </div>

        {
          (donPioPath === pathName) ?
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
