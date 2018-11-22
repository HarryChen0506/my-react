// 对组件进行测试 Component
import {React, ReactDom} from '../../src/index'

describe('Componet', () => {
  let root = null

  before(() => {
    root = document.createElement('div');
    document.body.appendChild(root)
  })

  beforeEach(() => {
    root.innerHTML = ''
  })

  after(() => {
    root.parentNode.removeChild(root);
    root = null
  })

  it('should render a component', () => {
    class Demo extends React.Component {
      render () {
        return <h3>Hello</h3>
      }
    }
    ReactDom.render(<Demo />, root)
    expect(root.innerHTML).to.be.equal('<h3>Hello</h3>')
  })

  it('should render a component with props', () => {
    class Demo extends React.Component {
      render () {
        return <h3 {...this.props}>Hello</h3>
      }
    }
    // sinon.spy(Demo.prototype, 'render')   
    // console.log('Demo', Demo) 
    ReactDom.render(<Demo className="test"/>, root)
    // 函数调用次数
    // expect(Demo.prototype.render.callCount).to.be.equal(1)
    expect(root.innerHTML).to.be.equal('<h3 class="test">Hello</h3>')
  })
})