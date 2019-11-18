const token = 'e45bc16c2eedd998efa287aaf5a7b64671608e24'


//search all by users/org
export const GitApiSearcAll = (name,type) => (
  `https://api.github.com/search/users?access_token=${token}&q=${name}&type=${type}`
)


//get user stats
export const GitApiUserStats = user => (
  `https://api.github.com/users/${user}?access_token=${token}`
)


//get org/user repos
export const GitApiRepos = (name,param) => (
  `https://api.github.com/${(param === 'User') ?
    'users' : 'orgs'}/${name}/repos?access_token=${token}
    `
)

//get org/user repos url
export const GitApiReposUrl = (name,param) => {
  return (
    `
  https://api.github.com/${(param === 'User') ?
      'users' : 'orgs'}/${name}/repos?access_token=${token}&callback=callback
    `
  )
}


