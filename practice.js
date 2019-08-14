let button = document.forms[0].btn;
button.addEventListener('click', calcTax);

//https://qiita.com/amamamaou/items/25e8b4e1b41c8d3211f4
//https://qiita.com/rindarinda5/items/c26dc81fe8cd98992dc1
//getElementByClassName⇒htmlCollectionのオブジェクトで値が返ってくる
//getElementById⇒Idの値が返ってくる

function calcTax() {
    let inputText = document.forms[0].beforeTax.value;
    const taxRate = 1.08;
    const afterTax = inputText * taxRate;

    let afterText = document.forms[0].afterTax;
    afterText.value = afterTax;
}
//form名.form部品名
const button = calcForm.btn;
