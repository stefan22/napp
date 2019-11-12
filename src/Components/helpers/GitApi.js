export const GitApiUsers = user => (
  `https://api.github.com/search/users?q=${user}`
)

export const GitApiUser = user => (
  `https://api.github.com/users/${user}`
)


