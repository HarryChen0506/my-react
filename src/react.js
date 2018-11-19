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

function Component (props) {
  this.props = props || {}
  this.state = this.state || {}
}
Component.prototype = {
  setState (nextState) {
    console.log('setState', nextState)
    this.state = Object.assign({}, this.state, nextState)
    this._render(this)
    // 重新渲染
    // const returnVdom = this.render() // 重新渲染
    // document.getElementById('my-root').innerHTML = null
    // MyReactDom.render(returnVdom, document.getElementById('my-root'))
  },
  _render(component) {
    console.log('重新渲染组件');
    MyReactDom._render(component)
  }
}

const React = {
  createElement,
  Component
}

export default React