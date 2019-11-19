import React from 'react'


const Pagination = ({page,totalPages,handlePagination}) => (

  <div className='gituser__pagination'>
    <div className='pagination__wrapper'>
      <button
        disabled={page <= 1}
        onClick={() => handlePagination('prev')}
        to=''
        className='gp--arrow'>&laquo;
      </button>

      <span
        className='gp-page tally'>
        page <b>{page}</b> of <b>{totalPages}</b>
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




