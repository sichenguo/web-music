import jsonp from 'common/js/jsonp'
import { commonParams, options } from 'api/config'
// https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&g_tk=1801096175&jsonpCallback=GetSingerListCallback&loginUin=2537204257&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0
// g_tk=1801096175&inCharset=utf-8&outCharset=utf-8&notice=0&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&loginUin=2537204257&hostUin=0&format=json&platform=yqq&needNewCode=0&jsonCallback=__jp0
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const params = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 1801096175,
    loginUin: 2537204257,
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
  })  
  return jsonp(url, params, options)
}
