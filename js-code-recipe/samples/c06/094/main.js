// ボタンの参照
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  alert('こんにちは.\nあああ')
});


// ボタンをクリックしたとき
btn.addEventListener('click', (event) => {
  // アラートを表示
  alert('こんにちは。\n今日の天気は晴れです。');
});
