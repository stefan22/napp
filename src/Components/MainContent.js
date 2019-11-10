import React, {Component} from 'react'
import '../scss/components/main-content.scss'



class MainContent extends Component {

  render() {


    return (

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

    )
  }

}

export default MainContent
