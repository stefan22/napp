import {parseHeaderLink} from './parseHeaderLink'
import { getToken } from './token'

export const url = 'https://api.github.com'

const token = getToken();

const headers = {//search users
  'Accept' : 'application/vnd.github.v3.text-match+json',
  'Authorization' : `Token ${token}`
}

const headers_repos = {//user repos
  'Accept' : 'application/json',
  'Authorization' : `Token ${token}`
}

const headers_org = {//org
  'Accept' : 'application/vnd.github.surtur-preview+json',
  'Authorization' : `Token ${token}`
}

//git search user: at least 1repo & matches login
export const GitAPI_searchUser = async (name) => {
  const userReposUrl = `
    ${url}/search/users?q=${name}+repos:>1+in:login+type:user&per_page=28
    `
  let response = await fetch(userReposUrl, {
    'method': 'GET',
    'headers': headers
  })
  if(response.headers.get('link') !== null) {
    let links = parseHeaderLink(response.headers.get('link'))
    let result = await response.json()
    result.headerLinks = links
    return result
  }
}


//git list all organizations
export const GitAPI_searchOrg = async (name) => {
  const getOrgUrl = `${url}/orgs/${name}`
  //const listAllOrgUrl = `${url}/organizations`

  let response = await fetch(getOrgUrl, {
    'method': 'GET',
    'headers': headers_org
  })
  if(response.statusText !== 'Not Found') {
    let result = await response.json()
    return result
  }
}

//git org repos
export const GitAPI_orgRepos = async (repos) => {
  let getOrgRepos = `${repos}`
  let response = await fetch(getOrgRepos, {
    'method': 'GET',
    'headers': headers_org
  })
  if(response.headers.get('link') !== null) {
    let links = parseHeaderLink(response.headers.get('link'))
    let result = await response.json()
    result.headerLinks = links
    return result
  }
  else {
    let result = await response.json()
    return result
  }
}


//git user repos/ owner info
export const GitApi_userRepos = async (user) => {
  let repos = `${url}/users/${user}/repos`
  let response = await fetch(repos, {
    'method': 'GET',
    'headers': headers_repos
  })
  if(response.headers.get('link') !== null) {
    let links = parseHeaderLink(response.headers.get('link'))
    let result = await response.json()
    result.headerLinks = links
    return result
  }
  else {
    let result = await response.json()
    return result
  }
}

//git search user next page
export const GitAPI_searchNextPrevPage = async (nxt) => {
  const response = await fetch(nxt, {
    'method': 'GET',
    'headers': headers
  })
  if(response.headers.get('link') !== null) {
    let links = parseHeaderLink(response.headers.get('link'))
    let result = await response.json()
    result.headerLinks = links
    return result
  }
}

//git search usr page num
export const GitAPI_searchPage = async (url,pg) => {
  const response = await fetch(url+pg, {
    'method': 'GET',
    'headers': headers
  })
  if(response.headers.get('link') !== null) {
    let links = parseHeaderLink(response.headers.get('link'))
    let result = await response.json()
    result.headerLinks = links
    return result
  }
}

//git usr repos page num
export const GitAPI_reposPage = async (url,pg) => {
  let repos = `${url}${pg}`
  const response = await fetch(repos, {
    'method': 'GET',
    'headers': headers_repos
  })
  if(response.headers.get('link') !== null) {
    let links = parseHeaderLink(response.headers.get('link'))
    let result = await response.json()
    result.headerLinks = links
    return result
  }
  else {
    let result = await response.json()
    return result
  }
}



