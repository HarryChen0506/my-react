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
class Hello1 extends MyReact.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      count: 1
    }
  }
  handleClick (e) {
    // console.log('click me', e)
    const count = this.state.count
    this.setState((preState, props) => {
      return {
        count: preState.count + 1
      }
    })
    this.setState((preState, props) => {
      return {
        count: preState.count + 1
      }
    })
  }
  render () {
    return (
      <div className="wrap">
        <span name="span">hello1, {this.state.count}</span>
        <button onClick={this.handleClick}>click me</button>  
      </div>      
    )
  }
}
const Demo1 = (
  <div className="title" style={{color: 'red', fontSize: '30px'}} key={'title'}>
     <Hello1 name="harry"/>    
  </div>
)
console.log('Demo1', Demo1)
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


