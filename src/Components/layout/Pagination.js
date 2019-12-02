import React from 'react'
import {missingNums} from '../helpers/expandPagination'


const Pagination = ({page,totalPages,handlePagination,lastPage,fetchPageData}) => {

  totalPages = (totalPages < lastPage ? lastPage : totalPages)
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

        {
          morePagesLess.length === 2 ?
            <div
              className='dummy'
              style={{visibility:'hidden',display: 'inline-block'}}>
              <button style={{visibility: 'hidden',width:'41px'}}>&nbsp;</button>
            </div>
            : ''
        }
        {
          morePagesLess.length <= 1 ?
            <div
              className='dummy'
              style={{visibility:'hidden',display: 'inline-block'}}>
              <button style={{visibility: 'hidden',width:'41px'}}>&nbsp;</button>
            </div>
            : ''
        }
        <button
          disabled={page <= 1}
          onClick={() => handlePagination('prev')}
          className='gp--arrow'>&laquo;
        </button>

        {
          !!morePagesLess &&
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
          page <b>{page}</b> of <b>{totalPages}</b>
        </span>

        {
          !!morePagesGreater &&
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

        {
          morePagesGreater.length === 2 ?
            <div className='dummy'
              style={{visibility:'hidden',display: 'inline-block'}}>
              <button style={{visibility: 'hidden',width:'41px'}}>&nbsp;</button>
            </div>
            : ''
        }
        {
          morePagesGreater.length <= 1 ?
            <div
              className='dummy'
              style={{visibility:'hidden',display: 'inline-block'}}>
              <button style={{visibility: 'hidden',width:'41px'}}>&nbsp;</button>
            </div>
            : ''
        }

      </div>
    </div>
  )

}


export default Pagination




