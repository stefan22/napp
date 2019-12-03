export const parseHeaderLink = (header) => {

  if (header.length === 0) {
    throw new Error('header link length is zero')
  }
  // Split parts by comma
  var parts = header.split(',')
  var links = {}
  // Parse each part into a named link
  for(var i=0; i < parts.length; i++) {
    let section = parts[i].split(';')
    if (section.length !== 2) {
      throw new Error('section could not be split on \';\'')
    }
    let url = section[0].replace(/<(.*)>/, '$1').trim()
    let name = section[1].replace(/rel="(.*)"/, '$1').trim()
    links[name] = url
  }

  return links
}


export const handleSortBy = (v) => {
  const doc = document
  const handle = '.gitorg__sort-repos'
  switch(v) {
  case 'language':
    return doc.querySelectorAll(handle)[2]
  case 'name':
    return doc.querySelectorAll(handle)[1]
  case 'created_at':
    return doc.querySelectorAll(handle)[0]
  default:
    return
  }
}
