import React from 'react'
import {Link} from 'react-router-dom'


const Pagination = ({page,totalPages}) => (

  <div className='gituser__pagination'>
    <div className='pagination__wrapper'>
      <Link
        to=''
        className='gp--arrow'>&laquo;
      </Link>
      <Link to='' className='gp--page'>{page}</Link>
      <span className='gp-page active'>of</span>
      <Link to='' className='gp--page'>{totalPages}</Link>
      <Link
        to=''
        className='gp--arrow'>&raquo;
      </Link>
    </div>
  </div>

)


export default Pagination




