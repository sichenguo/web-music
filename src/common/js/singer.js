export default class Singerclass {
  constructor({id, name}) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
    // https://y.gtimg.cn/music/photo_new/T001R300x300M000 .jpg?max_age=2592000   
  }
}