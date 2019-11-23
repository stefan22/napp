import React from 'react'
import '../scss/components/tables-bottom.scss'


const ReposTable = ({created_at,name,description,language,owner,forks_count}) => (

  <tr>
    <td className='table__cell created' align='left'>{
      new Date(Date.parse(created_at)).toDateString()
    }</td>
    <td className='table__cell' align='left'>{name}</td>
    <td className='table__cell' align='left'>{
      description || 'No information available'}</td>
    <td className='table__cell' align='left'>{language}</td>
    <td className='table__cell' align='left'>{owner.login}</td>
    <td className='table__cell' align='left'>{forks_count}</td>
  </tr>

)

export default ReposTable
