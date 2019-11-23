/**
 * @param {number} ex: 36
 * => [Array] = 1.....34,35,36
 */

export const missingNums = (a) => {
  let num = [a], count = a
  var missing = new Array()
  for(let i=1; i <= count; i++) {
    if(num.indexOf(i) == -1) {
      missing.push(i)
    }
  }
  //missing
  return missing

}
