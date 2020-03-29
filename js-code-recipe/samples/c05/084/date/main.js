const date = new Date();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();

const label = `${hour}時${minute}分${second}秒`;

document.querySelector('#log').textContent = label;