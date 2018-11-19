import React from 'react'
import ReactDOM from 'react-dom'
import {React as MyReact, ReactDom as MyReactDom} from '../src/index'
import './style/index.css'

const Hello = function (){
  return (
    <span>Hello</span>
  )
}
function handleClick (e) {
  console.log('click me', e)
}
const Demo = (
  <div className="title" style={{color: 'red', fontSize: '30px'}} key={'title'}>
    <Hello />
    <button onClick={handleClick}>click me</button>  
  </div>
)

// console.log('Demo', Demo)
ReactDOM.render(
  Demo,
  document.getElementById('root')
)

// 渲染MyReactDOm
function renderMyReactDom () {
  MyReactDom.render(
    Demo,
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


