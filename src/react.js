import {ReactDom as MyReactDom} from '../src/index'
/**
 * vdom 生成
 * @param {*} tag 标签名（组件名）
 * @param {*} props 属性
 * @param {*} children 子元素
 */
function createElement (tag, props, ...children) {
  // console.log('myCreateElement', tag, props, children)
  const {key, ...restProps} = props || {}
  return {
    props: {
      children: children,
      ...restProps
    },
    type: tag,
    key
  }
}
/**
 * Component 构造器
 * @param {*} props new Component(props)
 */
function Component (props) {
  this.props = props || {}
  this.state = this.state || {}
}
Component.prototype = {
  setState (nextState) {
    console.log('setState', nextState)
    this.state = Object.assign({}, this.state, nextState)
    this._render(this)
  },
  _render(component) {
    console.log('重新渲染组件');
    MyReactDom.render(component)
  }
}

const React = {
  createElement,
  Component
}

export default React