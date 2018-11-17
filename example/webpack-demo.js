import './style/index.css';
import avatar from './images/avatar.png'
import print from './print'

function component() {
  var element = document.createElement('div');

  // lodash 是由当前 script 脚本 import 导入进来的
  element.innerHTML = `<div>
                          hello, harry!!!!!
                          <img src=${avatar} />
                      </div>`;
  element.classList.add('hello');

  var btn = document.createElement('button');  
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = print;  // onclick 事件绑定原始的 print 函数上

  element.appendChild(btn);
  return element;
}

let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.querySelector('#root').appendChild(element);

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    document.body.removeChild(element);
    element = component(); // 重新渲染页面后，component 更新 click 事件处理
    document.body.appendChild(element);
  })
}