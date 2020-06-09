/*
 *<script>
 *Javascriptの処理;
 *</script>
 */

//Javascriptにおいて'と"はどちらでもよい

//console

//F12で開発者ツール開き、そのコンソールに値を表示させる場合はconsole.log();
//四則演算(+,-,*,/,%(余り),**(数値のべき乗))

//変数の宣言(再代入可)
let myName = '鈴木', a = 1;

//定数の宣言(再代入不可,計算や結合は可能)
const fatherName = '佐藤', b = 2;

//比較演算子
// a==b(値が同じかどうか)
// a===b(値が等しく、型(数値、文字列など)も同じかどうか)
// a!=b(値が等しくないかどうか)
// a!==b(値が等しくない、または型が異なるかどうか)

//関数(function宣言)
function calcSum(a, b, c) {
    const result = a + b + c;
    return result;
}
alert(calcSum(10, 20, 30));

//関数(アロー関数)(aの()は省略可能＋アロー関数内の処理が1行のときは{}とreturnを省略可能)
const myFunction = a => {
    return a + 2;
};

//if文
const myPrice = 50;
if (myPrice >= 50) {
    alert('myPriceは' + myPrice + '以上')
} else if (myPrice >= 10) {
    alert('myPriceは10以上50未満')
} else {
    alert('myPriceは10未満')
}

//switch文(break書かないとその後の処理も行う、switchは===で比較する)
const myFruit = 'りんご';
switch (myFruit) {
    case 'りんご':
        alert('りんごです');
        break;
    case 'みかん':
        alert('みかんです');
        break;
    default:
        alert('その他です');
        break;
}

//for文
for (let index = 0; index < 10; index++) {
    console.log(index);
}

//while文
let myNumber = 0;
while (myNumber < 10) {
    console.log(myNumber);
    myNumber++
}

//foreach文
const array = ['いちご', 'みかん', 'りんご'];
array.forEach((value, index) => {
    console.log(index, value);
});

//IOSかどうか判定
const isIOs = navigator.userAgent.includes('iPhone');
if (isIOs) {
    alert('This OS in this device is ios');
}

//指定した要素の値を取得
/*<html上>
<input type="input" value="赤色" class="inputColor">
*/
//class要素を取得する場合は.,id要素を取得する場合は#
const elementInput = document.querySelector('.inputColor');
const inputValue = elementInput.getAttribute('value');
//=>赤色

//${}を利用する場合には``を利用しないと認識されない
const myName = '佐藤孝哉';
console.log(`私は${myName}です`);

//配列
const array = ['りんご', 'ばなな', 'もも'];


//////////////////////////////////////////////////
//オブジェクト
const object = [
    { id: 123, name: '佐藤' },
    { id: 124, name: '田中' },
    { id: 125, name: '高橋' },
];

//文字が入力される度に内容のチェックを行う
const searchIdInput = document.querySelector('#search-id-input');
searchIdInput.addEventListener('keyup', () => {
    //検索IDを取得,event.targetはイベントを発生させたオブジェクトへの参照です。(searchIdInput.valueでも同じ)
    const searchId = Number(event.target.value);
    findUser(searchId);
});

function findUser(searchId) {
    //オブジェクトの中からsearchIdに合致するものがあるか検索し、合致したid,nameをtargetDataに
    const targetData = object.find((data) => data.id === searchId);
    if (targetData == null) {
        /*!!!!!テキスト情報を取得・設定する場合は textContent プロパティ、
        HTMLコードを取得・設定する場合は innerHTML プロパティを使用します。
        */
        searchResult.textContent = '該当者なし';
        return;
    }
    searchResult.textContent = targetData.name;
}
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
//.button要素についてイベント設定
//データ
const userDataList = [
    { name: '鈴木', age: 18 },
    { name: '田中', age: 27 },
    { name: '佐藤', age: 32 },
    { name: '高橋', age: 41 },
    { name: '小笠原', age: 56 }
];
/*HTMLの要素
  <div class="button-wrapper">
    <button class="button" data-age="20">20歳以上</button>
    <button class="button" data-age="30">30歳以上</button>
    <button class="button" data-age="40">40歳以上</button>
  </div>*/
//querySelectorAllでCSSセレクタでマッチした要素を取得して NodeList として返します。
//返ってきたリストをForEachで回す、そのときリストの1行(<button class="button" data-age="20">20歳以上</button>)
//をelementとして渡す。
document.querySelectorAll('.button').forEach((element) => {
    element.addEventListener('click', (event) => {
        //eventはmouseEvent,クリックの場所などを返す
        onClickButton(event);
    });
});

/*ボタンがクリックされたときの処理*/
function onClickButton(event) {
    //クリックされたボタン要素
    const button = event.target;
    //ボタン要素からdata-ageを取得(data-age="20")
    const targetAge = button.dataset.age;
    const filterList = userDataList.filer((data) => data.age >= targetAge);
}
////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
//配列を偏りなく高速にシャッフルするにはFisher-Yatesのアルゴリズム
const array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const shuffled1 = shuffleArray(array1);
console.log(shuffled1); // 結果: [5, 1, 8, 3,...（略）
const array2 = ['田中', '鈴木', '吉田', '後藤', '辻'];
const shuffled2 = shuffleArray(array2);
console.log(shuffled2); // 結果: ["辻", "田中", "吉田", "鈴木", "後藤"]
/**
 * 配列をシャッフルします。
 * 元の配列は変更せず、新しい配列を返します。
 * @param sourceArr 元の配列
 * @returns シャッフルされた配列
 */
function shuffleArray(sourceArr) {
    // 元の配列の複製を作成
    const array = sourceArr.concat();
    // Fisher–Yatesのアルゴリズム
    const arrayLength = array.length;
    for (let i = arrayLength - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }

    return array;
}
////////////////////////////////////////////////////////

const today = new Date();
function showCurrentDate(today) {
    if (today instanceof Date) {
        //${}利用するには``が必要
        console.log(`現在は${today.toLocaleDateString()}です`);
    } else {
        console.log('不正なデータです');
    }
}
showCurrentDate(today);

//型の変換
Boolean(100);//True,Falseになる場合は0や空白('')の場合
String(1);//値を文字列型に
Number('1');//値を数値型に変換する
parseInt('1.05')//文字列を数値型(整数)に変換する→1
parseFloat('1')//文字列を数値型(浮動小数点)に変換する→1

// 日時を設定
date.setFullYear(2015);
date.setMonth(0);
date.setDate(1);
date.setHours(0);
date.setMinutes(0);
date.setSeconds(0);

//1か月前と60日後を計算
const date = new Date('2019/06/01');
date.setMonth(date.getMonth() - 1);
date.setDate(date.getDate() + 60);

/////////////////////////////////////////////////////////////////
//カウントダウン処理
const totalTime = 10000; // 10秒
const oldTime = Date.now();
//第2引数の1000ミリ秒後(1秒後)に第1引数の関数を実施する
const timerId = setInterval(() => {
    const currentTime = Date.now();
    // 差分を求める
    const diff = currentTime - oldTime;

    // 残りミリ秒を計算する
    const remainMSec = totalTime - diff;
    // ミリ秒を整数の秒数に変換する
    const remainSec = Math.ceil(remainMSec / 1000);

    let label = `残り${remainSec}秒`;

    // 0秒以下になったら
    if (remainMSec <= 0) {
        // タイマーを終了する
        //timerIdをclearIntervalで指定している
        clearInterval(timerId);

        // タイマー終了の文言を表示
        label = '終了';
    }

    // 画面に表示する
    document.querySelector('#log').innerHTML = label;
}, 1000);
///////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
//Windowサイズの測定
window.addEventListener('resize', resizeHandler);

function resizeHandler(event) {
    // 新しい画面幅
    const w = innerWidth;
    // 新しい画面高さ
    const h = innerHeight;

    document.querySelector('.value-width').innerHTML = `横幅は ${w}px です`;
    document.querySelector('.value-height').innerHTML = `高さは ${h}px です`;
}

///////////////////////////////////////////////////////////////
//ボタンを追加するhtmlとjs
/*<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>行追加</title>
</head>
<script src="displayAnotherInput.js" defer></script>
<style type="text/css">
    canvas {
        border: 1px solid black;
    }
</style>

<body>
    <div>
        <p class="paragraph1">1 <input type="text" class="inputForm" />
            <button class="addButton">追加</button>
            <button class="deleteButton">削除</button>
        </p>
        <span class="addInput"></span>
    </div>

    <canvas class="tutorial" width="150" height="150"></canvas>

</body>

</html>*/

let index = 1;

// const draw = () => {
//     var canvas = document.querySelector('.tutorial');
//     console.log("aaa");
//     if (canvas.getContext) {
//         var ctx = canvas.getContext('2d');
//     }
// };

// 
// 通常の関数式の場合、(function () { /* 関数本体 */ }());
// と書いても(function () { /* 関数本体 */ })(); の様に書いてもどちらも即時実行されるのですが、アロー関数の場合は
// (() => { /* 関数本体 */ })();
// の様に記述しなければならないようです。
// 

document.querySelector('.addButton').addEventListener('click', () => {
    index++;
    console.log(index);
    document.querySelector('.addInput').innerHTML +=
        `<p class="paragraph${index}">${index} <input type="text" class="inputForm" /></p>`;
    //アロー関数と即時実行関数の組み合わせ
    (() => {
        var canvas = document.querySelector('.tutorial');
        console.log("aaa");
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
        }
    })();
});

document.querySelector('.deleteButton').addEventListener('click', (event) => {
    if (index > 1) {
        console.log(event);
        //const parentDeleteElement = document.querySelector('.addInput');
        const deleteElement = document.querySelector(`.paragraph${index}`);
        deleteElement.remove();
        index--;
        console.log(index);
    } else {
        console.log('これ以上削除できません');
    }
});

//非同期通信の順序確認

// ★async function（asyncで宣言した非同期関数）は何をするのか
// ・async functionは呼び出されるとPromiseを返す。
// ・async functionが値をreturnした場合、Promiseは戻り値をresolveする。
// ・async functionが例外や何らかの値をthrowした場合はその値をrejectする。

// ★awaitは何をするのか
// ・awaitを指定した関数のPromiseの結果が返されるまで、async function内の処理を一時停止する。
// ・結果が返されたらasync function内の処理を再開する。

//最初に実行されるメソッド・getList
//asyncを付けることで非同期で動作する
// import axios from 'axios';

const axios = require('axios');

async function getList() {
    console.log(1);
    await getRequest();
    const item = await fetchList();
    //最後に実施
    console.log(10);
}
//非同期で実施
async function fetchList() {
    console.log(2);
    //awaitなのでpromiseが返ってくるまで待つ
    // const list = fetchListAPI(); // awaitしない場合、次のconsole.log(list)を先に読み込んでしまう。
    const list = await fetchListAPI();
    console.log(list);
    await dispatchDone();
    console.log(9);
    return list;
}
async function dispatchDone() {
    console.log(5);
    await total();
    async function total() {
        console.log(6);
        const list = await listAPI();
        await getRequest();
        console.log(8);
    }
}
async function fetchListAPI() {
    console.log(3);
    await getRequest();
    return 4;
}
function listAPI() {
    console.log(7);
}

async function getRequest() {
    let response;
    try {
        response = await axios.get('https://cat-fact.herokuapp.com/facts?animal_type=cat&amount=2');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

getList();

