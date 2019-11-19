import {parseHeaderLink} from './parseHeaderLink'
import token from './token'

const url = 'https://api.github.com'

const headers = {//search users
  'Accept' : 'application/vnd.github.v3.text-match+json',
  'Authorization' : `Token ${token}`
}

/*
   git search user repos
   => at least 1repo & matches login id
*/
export const GitAPI_searchUserRepos = async (name) => {
  const userReposUrl = `
  ${url}/search/users?q=${name} in:login repos:>1 type:user&per_page=28
  `
  const response = await fetch(userReposUrl, {
    'method': 'GET',
    'headers': headers
  })

  let links = parseHeaderLink(response.headers.get('link'))
  let result = await response.json()
  result.headerLinks = links
  console.log(result)
  return result

}//GitApiRepos








// //search all by users/org
// export const GitApiSearcAll = (name,type) => (
//   `https://api.github.com/search/users?access_token=${token}&q=${name}&type=${type}`
// )


//get user stats
// export const GitApiUserStats = user => (
//   `https://api.github.com/users/${user}?access_token=${token}`
// )


// //get org/user repos
// export const GitApiRepos = (name,param) => (
//   `https://api.github.com/${(param === 'User') ?
//     'users' : 'orgs'}/${name}/repos?access_token=${token}
//     `
// )

//get org/user repos url
// export const GitApiReposUrl = (name,param) => {
//   return (
//     `
//   https://api.github.com/${(param === 'User') ?
//       'users' : 'orgs'}/${name}/repos?access_token=${token}&callback=callback
//     `
//   )
// }


