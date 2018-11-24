function diff (oldDom, newVdom) {
  if (oldDom === null) {
    return newVdom
  }

  if (_.isNumber(newVdom)) {
    newVdom = newVdom.toString() // 将数字转为字符串统一比较
  }

  if (_.isString(newVdom)) {            // 如果是文本
    return diffTextDom(oldDom, newVdom)
  }
  if (_.isFunction(newVdom.nodeName)) { // 如果是自定义组件
    return diffComponent(oldDom, newVdom)
  }
}
function diffTextDom(oldDom, newVdom) {
  let dom = oldDom
  if (oldDom && oldDom.nodeType === 3) { // 如果老节点是文本节点
    if (oldDom.textContent !== newVdom) {
      oldDom.textContent = newVdom
    }
  } else {
    dom = document.createTextNode(newVdom)
    if (oldDom && oldDom.parentNode) {
      oldDom.parentNode.replaceChild(dom, oldDom)
    }
  }
  return dom
}
function diffComponent(oldDom, newVdom) {
  if (oldDom._component && (oldDom._component.constructor !== newVdom.nodeName)) { // 如果新老组件名不同，则直接用新组件替换老组件
    const newDom = vdomToDom(newVdom)
    oldDom.parentNode.insertBefore(newDom, oldDom)
    if (oldDom._component.componentWillUnmount) { oldDom._component.componentWillUnmount() }
    oldDom.parentNode.removeChild(oldDom)
    return newDom
  } else { // 如果组件名相同则替换 props 后
    setProps(oldDom._component, newVdom.attributes) // 将新的 attributes 值赋值给旧的
    renderComponent(oldDom._component)
    return oldDom
  }
}

export default diff