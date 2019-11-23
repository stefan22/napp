import React from 'react'
import {missingNums} from './helpers/expandPagination'


const Pagination = ({page,totalPages,handlePagination,lastPage,fetchPageData}) => {

  let availPages = missingNums(totalPages)
  let morePagesGreater = []
  let morePagesLess = []

  const addMorePages = (avail) => {
    avail.filter(itm => {
      if(itm > page && itm < page + 3) {
        morePagesGreater.push(itm)
      }
      return morePagesGreater
    })
  }
  addMorePages(availPages)

  const addLessPages = (avail) => {
    avail.filter(itm => {
      if(itm < page && itm > page - 3) {
        morePagesLess.push(itm)
      }
      return morePagesLess
    })
  }
  addLessPages(availPages)

  return (

    <div className='gituser__pagination'>
      <div className='pagination__wrapper'>
        <button
          disabled={page <= 1}
          onClick={() => handlePagination('prev')}
          className='gp--arrow'>&laquo;
        </button>

        {
          morePagesLess.map((itm,idx) =>
            <button
              key={idx}
              className='gp--arrow'
              onClick={() => fetchPageData(itm)}
            >
              {itm}

            </button>
          )
        }

        <span
          className='gp-page tally'>
          page <b>{page}</b> of <b>{totalPages || lastPage}</b>
        </span>

        {
          morePagesGreater.map((itm,idx) =>
            <button
              key={idx}
              className='gp--arrow'
              onClick={() => fetchPageData(itm)}
            >
              {itm}

            </button>
          )
        }

        <button
          disabled={page >= totalPages}
          onClick={() =>  handlePagination('next')}
          className='gp--arrow'>&raquo;
        </button>

      </div>
    </div>
  )

}


export default Pagination




