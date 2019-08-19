let disp;
let messageDisp;

let playerName;
let opponent;

function changeMessage(disp) {
    //Form名.Formの部品名.valueで値を取得
    playerName = inputName.inputPlayerName.value;
    opponent = inputName.opponent.value;
    //空文字の判定
    if (!playerName) {
        disp = 'block';
    } else {
        messageDisp = 'block';
    }

    //Player名をセットする
    //html要素.innerText='~~'でhtmlの要素を上書きできる。
    document.querySelector('.playerName').innerText = playerName;

    //対戦相手名をセットする
    document.querySelector('.opponent').innerText = opponent;

    //div(inputUserName)を非表示に
    document.querySelector('.inputUserName').style.display = disp;
    //div(messageWindow)を表示
    document.querySelector('.messageWindow').style.display = messageDisp;
    //div(battleWindow)を表示
    document.querySelector('.battleWindow').style.display = messageDisp;
}

//let guh = document.getElementById('guh');
//guh.addEventListener('click', selectGuh);

function selectGuh() {
    const playderHand = 'guh';
    const battleResult = battle(playderHand);
}

function selectChoki() {
    const playderHand = 'choki';
    const battleResult = battle(playderHand);

}

function selectPah() {
    const playderHand = 'pah';
    const battleResult = battle(playderHand);
}

//全部のじゃんけんの回数
let totalCount = 1;
//引き分けになったじゃんけんの回数
let evenCount = 0;

//Playerの勝利回数
let playerWinCount = 0;
//対戦相手の勝利回数
let opponentWinCount = 0;

function battle(playderHand) {
    //じゃんけんの手を配列にセットする
    const arrayOpponentHand = ['guh', 'choki', 'pah'];
    //じゃんけんの手をランダムに選択する
    const opponentHand = arrayOpponentHand[Math.floor(Math.random() * arrayOpponentHand.length)];
    //じゃんけんの回数を求めるための準備
    const countDisp = document.getElementById('disp_count');
    //カウントアップしない回数を取得
    const beforeCountUpDisp = Number(countDisp.textContent);
    totalCount += 1;

    //じゃんけんの回数が1~5回までの場合、htmlの回数を上書き
    countDisp.innerHTML = beforeCountUpDisp + 1;
    switch (playderHand) {
        case 'guh':
            if (opponentHand == 'guh') {
                alert('相手の手はグーだ!結果はあいこだ!');
                //あいこになった回数として1加算
                evenCount++;
                countDisp.innerHTML = totalCount - evenCount;
            } else if (opponentHand == 'choki') {
                alert('相手の手はチョキだ!結果は勝ちだ!');
                playerWinCount++;
                writeWinResultAtPlayer(beforeCountUpDisp);
            } else if (opponentHand == 'pah') {
                alert('相手の手はパーだ!結果は負けだ...');
                opponentWinCount++;
                writeWinResultAtOpponent(beforeCountUpDisp);
            } else {
                alert('不正な勝負です。')
            }
            break;

        case 'choki':
            if (opponentHand == 'guh') {
                alert('相手の手はグーだ!結果は負けだ...');
                opponentWinCount++;
                writeWinResultAtOpponent(beforeCountUpDisp);
            } else if (opponentHand == 'choki') {
                alert('相手の手はチョキだ!結果はあいこだ!');
                //あいこになった回数として1加算
                evenCount++;
                countDisp.innerHTML = totalCount - evenCount;
            } else if (opponentHand == 'pah') {
                alert('相手の手はパーだ!結果は勝ちだ!');
                playerWinCount++;
                writeWinResultAtPlayer(beforeCountUpDisp);
            } else {
                alert('不正な勝負です。')
            }
            break;
        case 'pah':
            if (opponentHand == 'guh') {
                alert('相手の手はグーだ!結果は勝ちだ!');
                playerWinCount++;
                writeWinResultAtPlayer(beforeCountUpDisp);

            } else if (opponentHand == 'choki') {
                alert('相手の手はチョキだ!結果は負けだ...');
                opponentWinCount++;
                writeWinResultAtOpponent(beforeCountUpDisp);
            } else if (opponentHand == 'pah') {
                alert('相手の手はパーだ!結果はあいこだ!');
                //あいこになった回数として1加算
                evenCount++;
                countDisp.innerHTML = totalCount - evenCount;
            } else {
                alert('不正な勝負です。')
            }
            break;


    }

    //じゃんけんの回数が6以上になった場合、終了するように設定。
    if (totalCount - evenCount >= 6) {
        document.querySelector('.battleMessage').style.display = 'none';
        document.querySelector('.selectCommand').style.display = 'none';

        //結果のメッセージを表示
        document.querySelector('.resultMessage').style.display = 'block';

        let winner;
        let emotionalMessage;
        if (playerWinCount > opponentWinCount) {
            winner = playerName;
            emotionalMessage = 'おめでとう!!'
            document.querySelector('.playerFinalResult').innerHTML = winMessage;
        } else {
            winner = opponent;
            emotionalMessage = '残念、また挑戦してね!!'
            document.querySelector('.opponentFinalResult').innerHTML = winMessage;

        }
        //勝者の記入
        document.querySelector('.winner').innerHTML = winner;
        document.querySelector('.emotionalMessage').innerHTML = emotionalMessage;

        //
        document.querySelector('.nextPageButton').addEventListener('click', () => {
            //ページの再読み込み
            location.reload();
        });

    } else {
        console.log('とくになし');
    }

}

const winMessage = '○';

function writeWinResultAtPlayer(writePosition) {
    switch (writePosition) {
        case 1:
            document.querySelector('.playerFirstResult').innerHTML = winMessage;
            break;
        case 2:
            document.querySelector('.playerSecondResult').innerHTML = winMessage;
            break;
        case 3:
            document.querySelector('.playerThirdResult').innerHTML = winMessage;
            break;
        case 4:
            document.querySelector('.playerFourthResult').innerHTML = winMessage;
            break;
        case 5:
            document.querySelector('.playerFifthResult').innerHTML = winMessage;
            break;
    }
}

function writeWinResultAtOpponent(writePosition) {
    switch (writePosition) {
        case 1:
            document.querySelector('.opponentFirstResult').innerHTML = winMessage;
            break;
        case 2:
            document.querySelector('.opponentSecondResult').innerHTML = winMessage;
            break;
        case 3:
            document.querySelector('.opponentThirdResult').innerHTML = winMessage;
            break;
        case 4:
            document.querySelector('.opponentFourthResult').innerHTML = winMessage;
            break;
        case 5:
            document.querySelector('.opponentFifthResult').innerHTML = winMessage;
            break;
    }
}
