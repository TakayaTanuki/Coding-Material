<<<<<<< Updated upstream
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

=======
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

>>>>>>> Stashed changes
