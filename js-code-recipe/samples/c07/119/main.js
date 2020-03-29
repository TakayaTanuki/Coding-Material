// 操作対象エリア
const logArea = document.querySelector('#log2');

// 対象エリア上でマウスボタンを押したら、ログを出力
logArea.addEventListener('mousedown', () => {
  logArea.textContent = `マウスボタンを押した`;
});

// 対象エリア上でマウスボタンを離したら、ログを出力
logArea.addEventListener('mouseup', () => {
  logArea.textContent = `マウスボタンを離した`;
});

// 対象エリア上でマウスを移動したら、ログを出力
logArea.addEventListener('mousemove', () => {
  logArea.textContent = `マウスを移動した`;
});
