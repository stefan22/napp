const getHeaderLinks = link => {
  let obj = {};

  console.log('what is link ', link, ' what is obj ', obj);

  let brknprevName, brknlastName, brknnextName, brknprevLink, brknlastLink, brknnextLink;
  let brknprev, brknlast, brknnext;

  if (typeof link === 'object') {

    //link.prev
    brknprevLink = link.prev || '';
    obj.prevLink = brknprevLink;

    if (brknprevLink.length > 3) {
      brknprev = brknprevLink.split('=');
      brknprevName = Number(brknprev.filter((lk, idx) => idx === brknprev.length - 1))
      obj.prevName = brknprevName
    }

    //link.last    
    brknlastLink = link.last || '';
    obj.lastLink = brknlastLink;

    if (brknlastLink.length > 3) {
      brknlast = brknlastLink.split('=');
      brknlastName = Number(brknlast.filter((lk, idx) => idx === brknlast.length - 1))
      obj.lastName = brknlastName;
    }


    //link.next
    
    brknnextLink = link.next || '';
    obj.nextLink = brknnextLink;

    if (brknnextLink.length > 3) {
      brknnext = brknnextLink.split('=');
      brknnextName = Number(brknnext.filter((lk, idx) => idx === brknnext.length - 1));
      obj.nextName = brknnextName;
    }

    return obj
  }
}

export default getHeaderLinks


