import utils from './utils/utils'
import _ from 'lodash'
// 功能和 ReactDom.render() 类似
// 第一步渲染最高父元素 将vdom转换成真实dom
// 迭代父元素下的子元素children，递归调用render函数
function render (vdom, container) {
  console.log('render', vdom, container)
  // 渲染父元素
  const { props, type, key} = vdom
  // 判断是否文本，若是文本直接拼接字符串 return
  if (_.isString(vdom) || _.isNumber(vdom)) {
    container.innerText = container.innerText + vdom
    return
  }
  // 判断是否组件
  if (_.isFunction(vdom.type)) {
    let component, returnVdom
    if (vdom.type.prototype.render) {
      // class 格式的组件
      component = new vdom.type()
      returnVdom = component.render()
    } else {
      // function 格式的组件
      returnVdom = vdom.type()
    }
    render(returnVdom, container)
    return
  }
  // 创建真实dom
  const element = document.createElement(type)
  for (let attr in props) {
    setAttribute(element, attr, props[attr])    
  }
  // 迭代子元素， 递归render
  if (props && props.children ) {
    if (Array.isArray(props.children)) {
      props.children.forEach(child => {
        // console.log('child', typeof child.type, child.type)
        render(child, element)          
      });
    } else {
      render(props.children, element)
    }    
  }
  // 将真实dom 添加到父容器
  container.appendChild(element)
}

// 属性赋值
function setAttribute (dom, attr, value) {
  // console.log(dom, attr, value)
  if (attr === 'className') {
    attr = 'class'
  }

  if (attr === 'style') {
    const styleList = []
    for (let key in value) {
      const style_key = utils.camelToHyphen(key)
      const style_value = value[key]
      const style_str = `${style_key}:${style_value}`
      styleList.push(style_str)
    }
    value = styleList.join(';')
  }

  if (attr === 'children') {
    // 不做处理
  } else {
    dom.setAttribute(attr, value)
  }
}

export const ReactDom = {
  render(vdom, container) {
    container.innerHTML = null;
    render(vdom, container)
  }
}
export default ReactDom