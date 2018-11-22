describe('异步', () => {  
  it('1000ms后执行', function (done) {
    expect(2*2).to.be.equal(4)
    var result = true
    setTimeout(() => {
      result = false
      expect(result).to.be.not.ok
      done()
    }, 1000)
  })
})