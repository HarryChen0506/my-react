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
    const result =  {
      props: {        
        ...restProps,
        children: children,
      },
      type: tag,
      key
    }
    return result
  }
  React.createElement = createElement
})(React)



// Component构造器
;(function (React) {
  const defer = (func) => {
    setTimeout(() => {
      func()
    }, 0)
  }
  const queue = [] // 队列,用来缓存setState,当数组长度大于0不执行
  /**
   * Component 构造器
   * @param {*} props new Component(props)
   */
  function Component (props) {
    this.props = props || {}
    this.state = this.state || {}
  }
  Component.prototype.setState = function (nextState, cb) {
    if (queue.length === 0) {
      // 当队列有component, 则不执行异步渲染
      defer(() => {
        this._render(this)
      })
    }
    if (!queue.includes(this)) {
      queue.push(this)
    }
    this._setState(nextState, cb)    
  }
  Component.prototype._setState = function (nextState, cb) {
    let state
    if (typeof nextState === 'function') {
      state = nextState(this.state, this.props)
    } else {
      state = nextState
    }
    this.state = Object.assign({}, this.state, state)
    typeof cb === 'function' && cb()
    console.log('setState', this.state)
  }
  Component.prototype._render = function () {
    console.log('重新渲染组件');
    let component
    while(component = queue.shift()) {
      MyReactDom.renderComponent(component, true)
    }
  }

  // 闭包
  React.Component = Component  
})(React)

// console.log('React', React)
export default React