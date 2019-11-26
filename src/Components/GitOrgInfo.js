import React from 'react'
import {Link} from 'react-router-dom'
import '../scss/components/orgs.scss'


const GitOrgInfo = ({org: {
  id,avatar_url,login,hooks_url,public_repos,
  created_at,issues_url,members_url,repos_url,url
}}) => (


  <div className='gitorg__item'>
    <div className='gitorg--inner'>
      <div className='gitorg--logo'>
        <img className='gitorg-img' src={avatar_url} alt={login} height='420' width='420' />
      </div>
      <div className='gitorg__info'>
        <div className='gitorg--content'>
          <div className='gitorg__stats'>
            <h5 className='gitorg__heading'>
              {login}
            </h5>
            <div className='gitorg--inner'>

              <h5 className='gitorg__stat'>Id:</h5>
              <h6 className='gitorg__stat--val'>{id}</h6>

              <h5 className='gitorg__stat'>Created:</h5>
              <h6 className='gitorg__stat--val'>{created_at}</h6>

              <h5 className='gitorg__stat'>Name:</h5>
              <h6 className='gitorg__stat--val'>{login}</h6>

              <h5 className='gitorg__stat'>Issues Url:</h5>
              <h6 className='gitorg__stat--val'>{issues_url}</h6>

              <h5 className='gitorg__stat'>Members Url:</h5>
              <h6 className='gitorg__stat--val'>{members_url}</h6>

              <h5 className='gitorg__stat'>Public repos:</h5>
              <h6 className='gitorg__stat--val'>{public_repos}</h6>

              <h5 className='gitorg__stat'>Hooks Url:</h5>
              <h6 className='gitorg__stat--val'>{hooks_url}</h6>

              <h5 className='gitorg__stat'>Repos Url:</h5>
              <h6 className='gitorg__stat--val'>{repos_url}</h6>
            </div>
          </div>

          <div className='gitorg__outside-link'>
            <button className='gitorg-btn' type='button'>
              <Link to={''} target={'_blank'}>
               Link to Git
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

)


export default GitOrgInfo





// <div className='git-item'>
  //   <div className='gitblock'>
  //     <div className='gitimage '>
  //       <span className='gitlabel'>
  //         <span>{id}</span>
  //       </span>
  //       <div className='gitflip'>
  //         <Link to={{
  //           // pathname: `/git/${id}`,
  //           // login: login,
  //           // type: type,
  //         }}
  //         className='gitflip-image'>
  //           <img src={avatar_url} alt='' width='420' height='420' />
  //         </Link>
  //       </div>
  //       <Link to={{
  //         // pathname: `/git/${id}`,
  //         // login: login,
  //         // type: type,
  //       }}
  //       className='gitflip-text'>
  //         <span>View User</span>
  //       </Link>
  //     </div>

  //     <div className='gitinfo'>
  //       <div className='left'>
  //         <h3 className='name'>
  //           Name: {login}
  //         </h3>
  //         <div className='git-other'>
  //           <span>Profile: </span>
  //           <span className='gitprofile'>
  //             <Link to={''} target='_blank' rel='noopener noreferrer'
  //               title={`${''} - Git profile`}>
  //               {`${''}_page`}
  //             </Link>
  //           </span>
  //         </div>
  //       </div>

  //       <div className='right'>
  //         <p className='gitscore'>
  //            Public repos: <span>{public_repos}</span>
  //         </p>
  //       </div>
  //     </div>

  //   </div>
  // </div>
