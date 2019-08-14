let disp;
let messageDisp;

document.querySelector('.messageWindow').style.display = 'none';

function changeMessage(disp) {
    const playerName = inputName.inputPlayerName.value;
    const opponent = inputName.opponent.value;
    //playerName == ''
    //空文字の判定
    if (!playerName) {
        disp = 'block';
    } else {
        messageDisp = 'block'
    }


    //Player名をセットする
    document.querySelector('.playerName').innerText = playerName;

    //対戦相手名をセットする
    document.querySelector('.opponent').innerText = opponent;

    //div(inputUserName)を非表示に
    document.querySelector('.inputUserName').style.display = disp;
    //div(messageWindow)を表示
    document.querySelector('.messageWindow').style.display = messageDisp;
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
