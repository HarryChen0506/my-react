import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.css'

class Foo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: "Foo"
    }
  }

  componentWillReceiveProps(props) {
    console.log('Foo componentWillReceiveProps', props)
  }

  componentWillUpdate (props, state) {
    console.log('Foo componentWillUpdate', props, state)
  }

  render () {
    return <span>组件</span>
  }
}
class Hello extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      count: 1
    }
  }

  componentDidMount () {
    // console.log('react componentDidMount')
  }

  componentWillReceiveProps(props) {
    console.log('Hello componentWillReceiveProps', props)
  }
  
  componentWillUpdate (props, state) {
    console.log('Hello componentWillUpdate', props, state)
  }
  
  handleClick (e) {
    // console.log('click me', e)
    const count = this.state.count
    this.setState({
      count: count + 1
    })
  }
  render () {
    return (
      <div className="wrap">
        <Foo title="foo"/>
        <span name="span">hello, {this.state.count}</span>
        <button onClick={this.handleClick}>click me</button>  
      </div>      
    )
  }
}

const Demo = (
  <div className="title" style={{color: 'red', fontSize: '30px'}} key={'title'}>
    <Hello name="harry"/>
  </div>
)

// console.log('Demo', Demo)
ReactDOM.render(
  Demo,
  document.getElementById('root')
)


