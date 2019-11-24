import React from 'react'
import SearchFilters from './SearchFilters'


const SearchContainer = (
  {filterBy,results,matchingResuls,handleFilter,handleSearchQuery,handleChange}
) => {

  return (

    <div className='search-container'>
      <div className='search-container-inner'>
        <h2 className='search-container__title'>
          Git Search By
          <span>{filterBy}</span>
        </h2>
        <form
          onSubmit={handleSearchQuery}
          className='search-form'>
          <input
            onBlur={handleChange}
            onFocus={handleChange}
            onKeyDown={handleChange}
            className='search-form__input'
            type='text' name='search'
          />

          <SearchFilters
            filterBy={filterBy}
            handleFilter={handleFilter}
          />

        </form>
      </div>
      {
        !!results &&
            matchingResuls
      }
    </div>

  )
}


export default SearchContainer
