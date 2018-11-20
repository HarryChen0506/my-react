import {ReactDom as MyReactDom} from '../src/index'

const React = {}

// vdom生成器
;(function (React) {
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
  React.createElement = createElement
})(React)



// Component构造器
;(function (React) {
  const defer = (func) => {
    setTimeout(() => {
      console.log('异步执行')
      func()
    }, 1000)
  }
  /**
   * Component 构造器
   * @param {*} props new Component(props)
   */
  function Component (props) {
    this.props = props || {}
    this.state = this.state || {}
  }
  Component.prototype.setState = function (nextState, cb) {
    let state
    if (typeof nextState === 'function') {
      state = nextState(this.state, this.props)
    } else {
      state = nextState
    }
    this.state = Object.assign({}, this.state, state)
    typeof cb === 'function' && cb()

    console.log('setState', this.state)
    
    defer(() => {
      this._render(this)
    })
  }
  Component.prototype._render = function (component) {
    console.log('重新渲染组件');
    MyReactDom.render(component)
  }

  // 闭包
  React.Component = Component  
})(React)

console.log('React', React)
export default React