import React from 'react'
import {Link} from 'react-router-dom'
import '../scss/components/gitlist.scss'


const GitUsersList = (
  {
    login,
    id,
    avatar_url,
    html_url,
    score,
  }
) => (

  <div className='git-item'>
    <div className='gitblock'>

      <div className='gitimage '>
        <span className='gitlabel'>
          <span>{id}</span>
        </span>
        <div className='gitflip'>
          <Link to='' className='gitflip-image'>
            <img src={avatar_url} alt='' width='460' height='460' />
          </Link>
        </div>
        <Link to='' className='gitflip-text'>
          <span>View User</span>
        </Link>
      </div>

      <div className='gitinfo'>
        <div className='left'>
          <h3 className='name'>
            Name: {login}
          </h3>
          <div className='git-other'>
            <span>Profile: </span>
            <span className='gitprofile'>
              <a href={html_url} target='_blank'
                title={`${login} - Git profile`}>
                {`${login}_page`}
              </a>
            </span>
          </div>
        </div>

        <div className='right'>
          <p className='gitscore'>
             Score: <span>{score.toFixed(0)}</span>
          </p>
        </div>
      </div>

    </div>
  </div>

)



export default GitUsersList
