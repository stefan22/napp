const getHeaderLinks = link => {
  let obj = {}
  let brknprevName,brknlastName,brknnextName,brknprevLink,brknlastLink,brknnextLink
  if(typeof link === 'object') {
    if(link.prev !== undefined) {
      brknprevLink = link.prev//links
      obj.prevLink = brknprevLink
      let brknprev = brknprevLink !== undefined ? brknprevLink.split('=') : undefined
      brknprevName = Number(brknprev.filter((lk,idx) => idx === brknprev.length -1))
      obj.prevName =  brknprevName
    }
    if (link.last !== undefined) {
      brknlastLink = link.last
      obj.lastLink = brknlastLink
      let brknlast = brknlastLink !== undefined ? brknlastLink.split('=') : undefined
      brknlastName = Number(brknlast.filter((lk,idx) => idx === brknlast.length -1))
      obj.lastName = brknlastName
    }
    if(link.next !== undefined) {
      brknnextLink = link.next
      obj.nextLink = brknnextLink
      let brknnext = brknnextLink !== undefined ? brknnextLink.split('=') : undefined
      brknnextName = Number(brknnext.filter((lk,idx) => idx === brknnext.length -1))
      obj.nextName =  brknnextName
    }
    return obj
  }
}

export default getHeaderLinks


