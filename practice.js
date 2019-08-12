let button = document.forms[0].btn;
button.addEventListener('click', calcTax);

function calcTax() {
    let inputText = document.forms[0].beforeTax.value;
    const taxRate = 1.08;
    const afterTax = inputText * taxRate;

    let afterText = document.forms[0].afterTax;
    afterText.value = afterTax;
}