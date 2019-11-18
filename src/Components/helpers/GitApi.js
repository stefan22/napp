const token = '43b8de672bb26e43a605ffeeade580478a220483'
//access_token=${token}&



//search all by users/org
export const GitApiSearcAll = (name,type) => (
  `https://api.github.com/search/users?q=${name}&type=${type}`
)


//get user stats
export const GitApiUserStats = user => (
  `https://api.github.com/users/${user}`
)


//get org/user repos
export const GitApiRepos = (name,param) => (
  `https://api.github.com/${(param === 'User') ?
    'users' : 'orgs'}/${name}/repos
    `
)

//get org/user repos url
export const GitApiReposUrl = (name,param) => {
  return (
    `
  https://api.github.com/${(param === 'User') ?
      'users' : 'orgs'}/${name}/repos?callback=callback
    `
  )
}


