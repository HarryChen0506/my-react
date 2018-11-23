import utils from './utils/utils'
import _ from 'lodash'
// 组件component是一种特殊的vdom, vdom.type是函数,并且拥有render函数
// 功能和 ReactDom.render() 类似
// 第一步渲染最高父元素 将vdom转换成真实dom
// 迭代父元素下的子元素children，递归调用render函数
function render (vdom, container) {
  // console.log('render', vdom)  // 组件
  let component, returnVdom
  const { props } = vdom
  // 判断是否组件
  if (_.isFunction(vdom.type)) {
    component = createComponent(vdom)
  }
  component ? _render(component, container) : _render(vdom, container)
}

function _render (component, container) {
  const vdom = component.render ? component.render() : component  
  // console.log('_render vdom', vdom)
  // 判断是否文本，若是文本直接拼接字符串 return
  if (_.isString(vdom) || _.isNumber(vdom)) {
    container.innerText = container.innerText + vdom
    return
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
  // console.log('dom', dom, typeof dom)
  // 组件container属性保存container信息
  if (component.container) {      
    // 注意：调用 setState 方法时是进入这段逻辑，从而实现我们将 dom 的逻辑与 setState 函数分离的目标；知识点: new 出来的同一个实例
    component.container.innerHTML = null
    component.container.appendChild(dom)
    return
  }
  component.container = container
  container.appendChild(dom)
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
  base = vdomToDom(rendered)
  console.log('renderComponent', component, base);
  component.base = base
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
        newRender(child, dom)
      });
    } else {
      newRender(props.children, dom)
    }    
  }
  return dom
}

// newRender 将虚拟vdom进行渲染
function newRender (vdom, container) {
  // console.log('newRender', vdom, container)
  const dom = vdomToDom(vdom)
  container && container.appendChild(dom)
}


export const ReactDom = {
  render(vdom, container) {
    if (container) {
      // 默认先清空父元素下的所有子元素
      container.innerHTML = null;
    }    
    // render(vdom, container)
    newRender(vdom, container)
  },
  renderComponent(component) {
    renderComponent(component)    
  }
}
export default ReactDom