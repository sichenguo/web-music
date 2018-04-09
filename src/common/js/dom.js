export function addClass(el, className) {
  if (!el.classList.contains(className)) {
    // debugger
    el.classList.toggle(className)
  }
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if(val) {
    el.dataset[name] = val
    //daset可以用来设置，不可以用来获取
  }else {
    return el.getAttribute(name)
  }
}