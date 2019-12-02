import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Header from '../layout/Header'
import Pagination from '../layout/Pagination'
import {GitAPI_searchNextPrevPage,GitAPI_reposPage} from '../helpers/GitApi'
import getHeaderLinks from '../helpers/getHeaderLinks'
import '../../scss/components/gituser.scss'
import '../../scss/components/header.scss'
import '../../scss/components/tables-bottom.scss'
import '../../scss/components/organization.scss'
import loadingBall from '../../images/ball.gif'


class OrgRepos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headerLinks: '',
      repos: 0,
      results: 0,
      page: 1,
      totalPages: 1,
      filterBy: 'Organization',
      loading: false,
      org: {
        id:0,name:'',created_at: '',location:'',blog:'',login:'',
        avatar_url:'',html_url:'',
        public_repos:0, is_verified:false,
      }

    }
  }

  componentDidMount() {
    const {
      totalPages,page,lastName,headerLinks,
      repos,id,name,created_at,location,blog,login,
      avatar_url,html_url,public_repos,is_verified,
    } = this.props.location
    this.setState({
      page,
      totalPages: (totalPages < lastName) ? lastName : totalPages,
      lastName,
      headerLinks,
      repos,
      org: {
        id,name,created_at,location,
        blog,login,avatar_url,
        html_url,public_repos,
        is_verified
      }
    })
  }

   updatePage = (dir) => {
     const {headerLinks:{lastName,nextName,prevName}} = this.state
     if(typeof dir === 'number') {//updt pg num
       this.setState({
         totalPages: lastName || prevName + 1,
         page: dir,
         loading: false,
       })
       return true
     }
     let isPage = (dir === 'next') ? nextName : prevName
     this.setState({//updt nx/prv pg
       totalPages: lastName,
       page: isPage,loading: false,
     })
   }

   handleHeaderLinks = (response) => {
     let headers = getHeaderLinks(response.headerLinks)
     const {lastLink,nextLink,prevLink,lastName,nextName,prevName} = headers
     return (
       this.setState({headerLinks: {
         lastLink,nextLink,prevLink,prevName,nextName,lastName,
       }})
     )
   }

  handlePagination = async (direction) => {
    const {headerLinks:{nextLink,prevLink}} = this.state
    const whichPage = (direction === 'next') ? nextLink : prevLink
    this.setState({loading: true})
    let pageData = await GitAPI_searchNextPrevPage(whichPage)
    let repos = []
    if(pageData !== undefined) {
      let pageItems = pageData.filter(itm =>
        itm.headerLinks === undefined ? repos.push(itm) : false
      )
      this.updatePage(direction)
      this.setState({repos: pageItems,loading: false})
      this.handleHeaderLinks(pageData)
    }
  }

  fetchPageData = async (pg) => {
    let handle = this.state.headerLinks.lastLink  || this.state.headerLinks.prevLink
    let rem = handle.indexOf('page=')
    handle = handle.slice(0,rem+5)
    this.setState({loading: true})
    let pageData = await GitAPI_reposPage(handle,pg)
    let repos = []
    if(pageData !== undefined) {
      let pageItems = pageData.filter(itm =>
        itm.headerLinks === undefined ? repos.push(itm) : false
      )
      this.setState({repos: pageItems})
    }
    this.updatePage(pg)
    this.handleHeaderLinks(pageData)

  }

  render() {
    //console.log(this)
    const {
      org: {
        id,name,created_at,location,
        blog,login,avatar_url,
        html_url,public_repos,
        is_verified}, page,loading,
      totalPages,lastName,repos,filterBy

    } = this.state

    const {goBack} = this.props.history

    return (
      <>
        {
          (loading) ?

            <div className='gituser__loading'>
              <h3>Loading...</h3>
              <img src={loadingBall} alt='loading' width='256' height='256' />
            </div>
            :

            <>
              <Header
                goBack={goBack}
              />
              { !!id &&
                <div className='gituser__page'>
                  <div className='gituser__section'>
                    <div className="gituser__header company">
                      <div className="gitcomp__left"></div>
                      <div className="gituser__intro">
                        <h1>GitHub Company</h1>
                        <div className="gituser__info">
                          <h3><span>Name:</span>{login}</h3>
                          <h3><span>Blog:</span> {blog || 'Not Available'}</h3>
                          <h3><span>Location:</span> {location || 'Not Available'}</h3>
                          {
                            login !== name &&
                      <h3><span>Fullname:</span>{name}</h3>
                          }
                          <h3><span>GitHub:</span>{html_url}</h3>
                        </div>
                      </div>
                      <div className="gituser__right">
                        <img src={avatar_url}
                          width="290" height="290" alt={login} />
                        <div className="gituser__stats">
                          <p><span>Is Verified:</span> {(is_verified) ? 'Yes' : 'No'}</p>
                          <p><span>GitHub Id:</span> {id}</p>
                          <p><span>GitHub Repos:</span> {public_repos}</p>
                          <p><span>Member Since:</span> {
                            !!created_at &&
                      Number((created_at).split('-')[0])
                          }</p>
                        </div>
                      </div>
                    </div>
                    <div className='repos'>
                      <div className='repos-wrapper'>
                        <table id='repos-table'>
                          <thead>
                            <tr>
                              <td>
                                  Created
                              </td>
                              <td>
                                  Name
                              </td>
                              <td>
                                  Description
                              </td>
                              <td>
                                  Language
                              </td>
                              <td>
                                  Forks
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              !!repos &&
                        repos.map((itm,idx) =>
                          <tr key={idx}>
                            <td className='table__cell created' align='left'>{
                              new Date(Date.parse(itm.created_at)).toDateString()
                            }</td>
                            <td className='table__cell name' align='left'>{
                              <a
                                rel="noopener noreferrer"
                                target={'_blank'}
                                href={itm.html_url}
                                title={itm.name}
                              >
                                {itm.name}
                              </a>
                            }</td>
                            <td className='table__cell' align='left'>{
                              itm.description || 'No information available'}</td>
                            <td className='table__cell' align='left'>{itm.language}
                            </td>
                            <td className='table__cell' align='left'>{itm.forks_count}                                   </td>
                          </tr>
                        )
                            }
                          </tbody>
                        </table>
                      </div>
                      {
                        !!repos && filterBy !== 'User' &&
                    <Pagination
                      page={page}
                      lastPage={lastName}
                      handlePagination={this.handlePagination}
                      fetchPageData={this.fetchPageData}
                      totalPages={totalPages}
                    />
                      }
                    </div>
                  </div>
                </div>
              }
            </>
        }

      }
      </>
    )
  }

}


export default (withRouter)(OrgRepos)

