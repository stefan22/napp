import React from 'react'
import '../../scss/components/tables-bottom.scss'


const ReposTable = (props) => {

  const {created_at,name,html_url,description,language,owner,forks_count} = props
  //console.log(props)

  return (

    <tr>
      <td className='table__cell created' align='left'>{
        new Date(Date.parse(created_at)).toDateString()
      }</td>
      <td className='table__cell name' align='left'>{
        <a
          rel="noopener noreferrer"
          target={'_blank'}
          href={html_url}
          title={name}
        >
          {name}
        </a>
      }</td>
      <td className='table__cell' align='left'>{
        description || 'No information available'}</td>
      <td className='table__cell' align='left'>{language}</td>
      <td className='table__cell' align='left'>{owner.login}</td>
      <td className='table__cell' align='left'>{forks_count}</td>
    </tr>

  )

}

export default ReposTable
