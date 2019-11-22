import React from 'react'


const Pagination = ({page,totalPages,handlePagination,lastPage}) => (

  <div className='gituser__pagination'>
    <div className='pagination__wrapper'>
      <button
        disabled={page <= 1}
        onClick={() => handlePagination('prev')}
        className='gp--arrow'>&laquo;
      </button>

      <span
        className='gp-page tally'>
        page <b>{page}</b> of <b>{totalPages || lastPage}</b>
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() =>  handlePagination('next')}
        className='gp--arrow'>&raquo;
      </button>
    </div>
  </div>

)


export default Pagination




