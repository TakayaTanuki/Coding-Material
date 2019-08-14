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

//IOSかどうか判定
const isIOs = navigator.userAgent.includes('iPhone');
if (isIOs) {
    alert('This OS in this device is ios')
}

//
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>じゃんけん！！</title>
    <link rel="stylesheet" href="janken.css">
    <script src="janken.js"></script>
</head>

<body>
    <!--1段落目(メッセージ表示)-->
    <!--Divタグにもclassやidを付与できるため、後ほど行うかも？？-->
    <div>
        <form action="javascript:void(0)" name="inputName">
            <h3>プレイヤー名を入力して下さい。</h3>
            <input type="text" name="inputPlayerName">
            <input type="submit" value="OK" name="submit" onclick="changeMessage('none');">
        </form>
    </div>

    <!--2段落目(じゃんけんの画像選択)-->
    <div>
        <!--できたら2,3段落目は最初非表示、名前が入力されたら表示できるようにする-->
        <div>
            <!--グーコマンド-->
            <span class="guhParagraph">
                <a href="#" onclick="selectGuh();">
                    <img src="C:\Users\1815598\Desktop\Material\guu.jpg" id="guh">
                </a>
            </span>

            <!--チョキコマンド-->
            <span class="chokiParagraph">
                <a href="#" onclick="selectChoki();">
                    <img src="C:\Users\1815598\Desktop\Material\choki.jpg" id="choki">
                </a>
            </span>

            <!--パーコマンド-->
            <span class="pahParagraph">
                <a href="#" onclick="selectPah();">
                    <img src="C:\Users\1815598\Desktop\Material\pah.jpg" id="pah">
                </a>
            </span>
        </div>

        <!--3段落目(Result表示)-->
        <div>
            戦績
            <table border="1">
                <!--Player名列-->
                <tr>
                    <td></td>
                    <td class="playerName"></td>
                    <!--<span class="playerName"></span>でも同じ-->
                    <td>aaa</td>
                </tr>
                <!--1戦目-->
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <!--2戦目-->
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <!--3戦目-->
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <!--4戦目-->
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <!--5戦目-->
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <!--勝敗-->
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
    </div>
</body>

</html>
let disp;

function changeMessage(disp) {
    const playerName = inputName.inputPlayerName.value;

    //playerName == ''
    //空文字の判定
    if (!playerName) {
        disp = 'block';
    }

    //Player名をセットする
    document.querySelector('.playerName').innerText = playerName;

    //Formを非表示に
    inputName.style.display = disp;

}

//let guh = document.getElementById('guh');
//guh.addEventListener('click', selectGuh);
function selectGuh() {
    alert('グー！');

}

function selectChoki() {
    alert('チョキ！');

}

function selectPah() {
    alert('パー！');

}

.guhParagraph{
    width : 100px ;
}

.chokiParagraph{
    width : calc(100% / 3) ;
}

.pahParagraph{
    width : calc(100% / 3) ;
}
