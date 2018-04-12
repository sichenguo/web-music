<template>
<div class="singer">
  <listview :data="singers" @select="selectSinger"></listview> 
  <router-view/>
</div>
</template>

<script type="text/ecmascript-6">
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singerclass from 'common/js/singer.js'
import Listview from 'base/listview/listview'
const HOT_NAME = '热门' 
const HOT_SINGERS_LEN = 10
export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    selectSinger(singer) {
      // debugger
      this.$router.push({
        path: `/singer/${singer.id}`
      })
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if(res.code === ERR_OK) {
          this.singers = this._nomoallize(res.data.list) 
          console.log(this.singers)
        }
      })
    },
    _nomoallize(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if(index < HOT_SINGERS_LEN) {
          map.hot.items.push(new Singerclass({
            id: item['Fsinger_mid'],
            name: item['Fsinger_name']
          }))
        }
        var key = item['Findex']
        if(!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singerclass({
          id: item['Fsinger_mid'],
          name: item['Fsinger_name']
        }))
      })
      let hot = []
      let res = []
      for(let key in map) {
        let val = map[key]
        if(val.title.match(/[a-zA-Z]/)) {
          res.push(val)
        }else if(val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      res.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      return hot.concat(res)
    }
  },
  components: {
    Listview,
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed 
    top: 88px
    bottom: 0px
    width: 100%

</style>