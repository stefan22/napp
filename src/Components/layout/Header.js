import React from 'react'
import '../../scss/components/header.scss'
import logo from '../../images/logo-one-try.png'
import logo__white from '../../images/logo-one-try__white.png'

const Header = () => (

  <header>
    <div className='topnav-container'>
      <div className='topnav-logo'>
        <img src={logo__white} alt='logo' />
      </div>
      <div className='topnav-link'>
        <p>link</p>
      </div>
    </div>

		 <div className='search-container'>
      <div className='search-container-inner'>
        <h2 className='search-container__title'>Git Search By <span>Username</span></h2>
        <form className='search-form'>
          <input className='search-form__input' type='text' name='search' />
          <div className='search-filters'>Filter by:
            <span>Username</span> &
            <span>Organization</span>
          </div>
        </form>
      </div>
    </div>
  </header>

)

export default Header
