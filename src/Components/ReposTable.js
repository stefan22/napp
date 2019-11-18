import React from 'react'
import '../scss/components/tables-bottom.scss'


const ReposTable = ({id,name,description,language,owner,forks_count}) => (

  <tr>
    <td className='table__cell' align='left'>{id}</td>
    <td className='table__cell' align='left'>{name}</td>
    <td className='table__cell' align='left'>{description}</td>
    <td className='table__cell' align='left'>{language}</td>
    <td className='table__cell' align='left'>{owner.login}</td>
    <td className='table__cell' align='left'>{forks_count}</td>
  </tr>

)

export default ReposTable
