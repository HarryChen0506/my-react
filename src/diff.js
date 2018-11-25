import _ from 'lodash'
import { renderComponent, vdomToDom } from './render'
function diff (oldDom, newVdom) {
  console.log('diff', oldDom, newVdom)    
  if (oldDom === null) {
    return newVdom
  }

  if (_.isNumber(newVdom)) {
    newVdom = newVdom.toString() // 将数字转为字符串统一比较
  }

  if (_.isString(newVdom)) {            // 如果是文本
    return diffTextDom(oldDom, newVdom)
  }
  if (_.isFunction(newVdom.type)) { // 如果是自定义组件
    console.log('diffComponent')
    return diffComponent(oldDom, newVdom)
  }
  if (oldDom.nodeName.toLowerCase() !== newVdom.type) { // 对比非文本节点
    console.log('diffNotTextDom')
    diffNotTextDom(oldDom, newVdom)
  }
  if (newVdom.props.children.length > 0) {
    console.log('diffChild')
    diffChild(oldDom, newVdom)
  }
  

  return oldDom
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
  if (oldDom._component && (oldDom._component.constructor !== newVdom.type)) { // 如果新老组件名不同，则直接用新组件替换老组件
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
/**
 * 对比非文本节点
 * @param {*} oldDom
 * @param {*} newVdom
 */
function diffNotTextDom(oldDom, newVdom) {
  let newDom
  newDom = document.createElement(newVdom.type);
  // [...oldDom.childNodes].map(newDom.appendChild)
  [...oldDom.childNodes].map( v => {
    newDom.appendChild(v)
  })

  if (oldDom && oldDom.parentNode) {
    oldDom.parentNode.replaceChild(newDom, oldDom)
  }
}

/**
 * 对比子节点，新一轮计划开启。
 * @param {*} oldDom
 * @param {*} newVdom
 */
function diffChild(oldDom, newVdom) {
  const keyed = {}
  const children = []
  const oldChildNodes = oldDom.childNodes
  for (let i = 0; i < oldChildNodes.length; i++) {
    if (oldChildNodes[i].key) {
      keyed[oldChildNodes[i].key] = oldChildNodes[i]
    } else { // 如果不存在 key，则优先找到节点类型相同的元素
      children.push(oldChildNodes[i])
    }
  }

  let newChildNodes = newVdom.props.children
  if (_.isArray(newVdom.props.children[0])) { // https://github.com/MuYunyun/cpreact/issues/9
    newChildNodes = newVdom.props.children[0]
  }

  for (let i = 0; i < newChildNodes.length; i++) {
    let child = null
    if (newChildNodes[i] && keyed[newChildNodes[i].key]) {
      child = keyed[newChildNodes[i].key]
      keyed[newChildNodes[i].key] = undefined
    } else { // 对应上面不存在 key 的情形
      // 在新老节点相同位置上寻找相同类型的节点进行比较；如果不满足上述条件则直接将新节点插入；
      if (children[i] && isSameNodeType(children[i], newChildNodes[i])) {
        child = children[i]
        children[i] = undefined
      } else if (children[i] && !isSameNodeType(children[i], newChildNodes[i])) { // 不是相同类型，直接替代掉
        if (newChildNodes[i] === null) {
          children[i].replaceWith('')
        }
        if (newChildNodes[i] && newChildNodes[i].nodeName) { // 后期虚拟 dom 考虑用类代替工厂模式，从而进行稳妥的比较
          children[i].replaceWith(vdomToDom(newChildNodes[i]))
        }
        children[i].replaceWith(newChildNodes[i])
        continue
      }
    }

    const result = diff(child, newChildNodes[i])
    // 如果 child 为 null
    if (result === newChildNodes[i]) {
      oldDom.appendChild(vdomToDom(result))
    }
  }
}

/**
 * 判断 dom 与 vdom 的节点类型是否相同
 * @param {*} dom
 * @param {*} vdom
 */
function isSameNodeType(dom, vdom) {
  if (vdom === null) { return false }
  if ((_.isNumber(vdom) || _.isString(vdom))) { // 判断是否为文本类型
    return dom.nodeType === 3
  }
  if (dom.nodeName.toLowerCase() === vdom.type) { // 判断非文本类型的 dom
    return true
  }
  if (_.isFunction(vdom.type)) { // 判断组件类型是否相同
    return dom._component && dom._component.constructor === vdom.type
  }
  return false
}

/**
 * 更改属性，componentWillMount 和 componentWillReceiveProps 方法
 */
function setProps(component, attributes) {
  if (attributes) { // 自定义组件比较中新老组件相同时 setProps 的逻辑
    component.props = attributes
  }
}

export default diff