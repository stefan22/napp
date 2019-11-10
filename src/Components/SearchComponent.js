import React from 'react'
import '../../scss/components/header.scss'


const SearchComponent = () => {

  return (

    <div className='search-container'>
      <div className='search-container-inner'>
        <h2 className='search-container__title'>Git Search By <span>Username</span></h2>
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
          <div className='search-filters'>Filter by:
            <span>Username</span> &
            <span>Organization</span>
          </div>
        </form>
      </div>
    </div>
  )

}

export default SearchComponent
