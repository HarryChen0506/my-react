import React from 'react'
import ReactDOM from 'react-dom'
import {React as MyReact, ReactDom as MyReactDom} from '../src/index'
import './style/index.css'

// class Hello extends React.Component {
  //   constructor (props) {
  //     super(props)
  //     this.handleClick = this.handleClick.bind(this)
  //     this.state = {
  //       count: 1
  //     }
  //   }
  //   handleClick (e) {
  //     // console.log('click me', e)
  //     const count = this.state.count
  //     this.setState({
  //       count: count + 1
  //     })
  //   }
  //   render () {
  //     return (
  //       <div className="wrap">
  //         <span name="span">hello, {this.state.count}</span>
  //         <button onClick={this.handleClick}>click me</button>  
  //       </div>      
  //     )
  //   }
// }

// const Demo = (
  //   <div className="title" style={{color: 'red', fontSize: '30px'}} key={'title'}>
  //     <Hello name="harry"/>
  //   </div>
// )

// console.log('Demo', Demo)
// ReactDOM.render(
//   Demo,
//   document.getElementById('root')
// )

/**---------------------------分割线---------------------------------------------- */

// 替换本项目的react.createElement方法
React.createElement = MyReact.createElement
class Foo extends MyReact.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: "Foo"
    }
  }
  componentWillMount () {
    console.log('Foo componentWillMount !!!')
  } 
  componentDidMount () {
    console.log('Foo componentDidMount !!!')
  }
  componentWillReceiveProps(props) {
    console.log('Foo componentWillReceiveProps !!!', props)
  }

  componentWillUpdate (props, state) {
    console.log('Foo componentWillUpdate !!!', props, state)
  }

  render () {
    return <span>组件</span>
  }
}
class Hello1 extends MyReact.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      count: 1
    }
  }
  componentWillMount () {
    console.log('Hello1 componentWillMount !!')
  }  
  componentDidMount () {
    console.log('Hello1 componentDidMount !!')
  }
  componentWillReceiveProps(props) {
    console.log('Hello1 componentWillReceiveProps', props)
  }
  handleClick (e) {
    // console.log('click me', e)
    const count = this.state.count
    this.setState((preState, props) => {
      return {
        count: preState.count + 1
      }
    })
  }
  renderCount () {
    if (this.state.count % 2 === 0) {
      return <span name="span">hello1, {this.state.count}</span>
    } else {
      return <div name="span">hello1, {this.state.count}</div>
    }    
  }
  render () {
    console.log('Hello1 render !!')
    return (
      <div className="wrap">        
        {this.renderCount()}
        <button onClick={this.handleClick}>click me</button>  
      </div>      
    )
  }
}
const Demo1 = (
  <div className="title" style={{color: 'red', fontSize: '30px'}} key={'title'}>
     <Hello1 name="harry"/>    
     {/* <span>123</span> */}
  </div>
)

// 渲染MyReactDOm
function renderMyReactDom () {  
  MyReactDom.render(
    Demo1,
    document.getElementById('my-root')
  )
}
renderMyReactDom()
if (module.hot) {
  module.hot.accept(function() {
    console.log('Accepting the updated!');
    renderMyReactDom ()
  })
}


