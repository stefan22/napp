import React from 'react'


const SearchFilters = ({filterBy,handleFilter}) => {

  return (
    <div className='search-filters'>
      <div className='radio-container'>
        Filter by:
        <label className='radio-label'>
          <input
            onChange={handleFilter}
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
            onChange={handleFilter}
            type='radio'
            value={'Organization'}
            checked={(filterBy === 'Organization')}
            name='radio' id='organization' />
          <span className='now-radio'></span>
          <span className='islabel'>Organization</span>
        </label>
      </div>
    </div>
  )
}


export default SearchFilters
