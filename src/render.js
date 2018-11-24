import utils from './utils/utils'
import diff from './diff.js'
import _ from 'lodash'
// 组件component是一种特殊的vdom, vdom.type是函数,并且拥有render函数
// 功能和 ReactDom.render() 类似
// 第一步渲染最高父元素 将vdom转换成真实dom
// 迭代父元素下的子元素children，递归调用render函数
// render 将虚拟vdom进行渲染
function render (vdom, container) {
  // console.log('render', vdom, container)
  const dom = vdomToDom(vdom)
  container && container.appendChild(dom)
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
  } else if (/^on\w+/.test(attr)) {
    // 事件处理
    const eventName = attr.toLocaleLowerCase().slice(2)
    dom.addEventListener(eventName, value)
  } else {
    dom.setAttribute(attr, value)
  }
}

/**
 * createComponent 将vdom实例化component
 * @param {*} vdom 虚拟vdom vdom.type是组件Class
 */
function createComponent (vdom = {}) {
  let component = {}
  const { props } = vdom
  if (vdom.type.prototype.render) {
    // class 格式的组件
    component = new vdom.type(props)
    // console.log('render component', component, vdom)
  } else {
    // function 格式的组件
    component.render = function () {
      return vdom.type(props)
    } 
  } 
  // 如果组件含有默认属性
  if (vdom.type.defaultProps) {
    component.props = Object.assign({}, vdom.type.defaultProps, component.props)
  }
  return component
}

/**
 * renderComponent 自定义组件渲染逻辑 只渲染自定义组件
 * @param {*} component 
 */
function renderComponent (component) {  
  let base, rendered
  rendered = component.render()

  // if (component.base) {
  //   // console.log('diff')
  //   // base = diff(component.base, rendered)
  // }

  base = vdomToDom(rendered) 

  if (component.base && component.base.parentNode) { // setState 进入此逻辑
    // Node.replaceChild(newnode,oldnode)
    console.log('component.base', component.base, component.base.parentNode)
    // setState后，组件父容器进行子元素的替换
    component.base.parentNode.replaceChild(base, component.base)
  }
  component.base = base
  console.log('renderComponent', component, base, base.parentNode);
}

// vdomToDom 将vdom转化成dom,返回dom,并挂载到container上
function vdomToDom (vdom) {
  if (vdom === null) { return document.createTextNode('') }
  // 判断是否文本，若是文本直接拼接字符串 return
  if (_.isString(vdom) || _.isNumber(vdom)) {
    const textNode = document.createTextNode(vdom)
    return textNode
  }
  // 判断是否是组件，若是组件，则进行render
  if (_.isFunction(vdom.type)) {
    const component = createComponent(vdom)
    renderComponent(component)
    return component.base
  }

  const { props, type, key} = vdom
  // 创建真实dom
  const dom = document.createElement(type)
  for (let attr in props) {
    setAttribute(dom, attr, props[attr])    
  }
  // 迭代子元素， 递归render
  if (props && props.children ) {
    if (Array.isArray(props.children)) {
      props.children.forEach(child => {
        // console.log('child', typeof child.type, child.type)
        render(child, dom)
      });
    } else {
      render(props.children, dom)
    }    
  }
  return dom
}




export const ReactDom = {
  render(vdom, container) {
    if (container) {
      // 默认先清空父元素下的所有子元素
      container.innerHTML = null;
    }    
    // render(vdom, container)
    render(vdom, container)
  },
  renderComponent(component) {
    renderComponent(component)    
  }
}
export default ReactDom