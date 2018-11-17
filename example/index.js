import './style/index.css';
import avatar from './images/avatar.png'

function component() {
  var element = document.createElement('div');

  // lodash 是由当前 script 脚本 import 导入进来的
  element.innerHTML = `<div>
                          hello, harry!
                          <img src=${avatar} />
                      </div>`;
  element.classList.add('hello');

  return element;
}

document.body.querySelector('#root').appendChild(component());