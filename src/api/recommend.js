// import jsonp from 'common/js/jsonp.js'
/* eslint-disable */
import axios from 'axios'
import {
  commonParams
} from './config'
const url_RD = '/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
const url_DL = "/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg"

const params_RD = Object.assign({}, commonParams, {
  format: 'json',
  uin: 0,
  platform: 'h5',
  needNewCode: 1
})
const params_DL = Object.assign({}, commonParams, {
  picmid: 1,
  format: 'json',
  loginUin: 0,
  platform: 'yqq',
  needNewCode: 0,
  categoryId: 10000000,
  sin: 0,
  sortId: 5,
  ein: 29,
  rnd: Math.random
})
// picmid = 1 & rnd=0.9832322352403835 & g_tk=5381 & jsonpCallback=getPlaylist & loginUin=0 & hostUin=0 & format=jsonp & inCharset=utf8 & outCharset=utf - 8 & notice=0 & platform=yqq & needNewCode=0 & categoryId=10000000 & sortId=5 & sin=0 & ein=29
export function getRecommendData() {
  return axios.get(url_RD, {
    params: params_RD,
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getDiscList() {
  return axios.get(url_DL, {
    params: params_DL,
  }).then(res => {
    return Promise.resolve(res.data)
  }).catch(e =>{
    console.log(e)
  })
}
