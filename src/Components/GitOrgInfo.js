import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../scss/components/orgs.scss'


class GitOrgInfo extends Component {

  componentDidMount() {
    const {org: {repos_url}} = this.props
    this.setState({loading: false})
    this.props.fetchGitOrgRepos(repos_url)
  }

  render() {
    const {org: {
      id,avatar_url,login,html_url,public_repos,name,
      created_at,issues_url,members_url,location,is_verified,
    },repos,page,lastName,headerLinks,loading,
    handlePagination,fetchPageData,totalPages,} = this.props

    return (
      <>
        {
          !loading &&
        <div className='gitorg__item'>
          <div className='gitorg--inner'>
            <div className='gitorg--logo'>
              <img className='gitorg-img' src={avatar_url}
                alt={login} height='420' width='420' />
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
                    <h6 className='gitorg__stat--val'>{
                      new Date(Date.parse(created_at)).toDateString()
                    }</h6>
                    <h5 className='gitorg__stat'>Name:</h5>
                    <h6 className='gitorg__stat--val'>{name}</h6>
                    <h5 className='gitorg__stat'>Location:</h5>
                    <h6 className='gitorg__stat--val'>{location}</h6>

                    <h5 className='gitorg__stat'>Issues Url:</h5>
                    <h6 className='gitorg__stat--val'>{issues_url}</h6>

                    <h5 className='gitorg__stat'>Members Url:</h5>
                    <h6 className='gitorg__stat--val'>{members_url}</h6>

                    <h5 className='gitorg__stat'>Public repos:</h5>
                    <h6 className='gitorg__stat--val'>{public_repos}</h6>

                    <h5 className='gitorg__stat'>Repos:</h5>

                    <button
                      className='gitorg__stat--val repos__btn' type='button'>
                      <Link to={{
                        pathname: `gitorg/${id}`,
                        repos,page,lastName,headerLinks,
                        handlePagination,fetchPageData,totalPages,
                        id,avatar_url,login,html_url,created_at,
                        public_repos,name,location,is_verified
                      }}
                      title={'See Repos'}>
                        See Repos
                      </Link>
                    </button>
                  </div>
                </div>

                <div className='gitorg__outside-link'>
                  <button className='gitorg-btn' type='button'>
                    <a href={html_url} target={'_blank'} title={`${login} GitHub page`}>
                  GitHub page
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        }
      </>
    )
  }
}


export default GitOrgInfo





