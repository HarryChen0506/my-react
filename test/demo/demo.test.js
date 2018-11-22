import add from './add.js'
describe('测试', () => {
  it('1加1等于2', function () {
    expect(add(1,1)).to.be.equal(2)
  })
  it('2c乘2等于4', function () {
    expect(2*2).to.be.equal(4)
  })
})