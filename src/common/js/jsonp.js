import originJSONP from 'jsonp'
export default function (url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + parm(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
// querystring.stringify()
function parm(data) {
  let url = ''
  for (var k in data) {
    url += `&${k}=${encodeURIComponent(data[k])}` 
  }
  return url ? url.substring(1) : ''
}
