// グー・チョキ・パーいずれかのボタンを押すと、コンピューターがランダムに
// グー・チョキ・パーを出し、その結果が戦績に一覧で保存・表示される

$(document).ready(function() {
  // ボタンを押すと、自分&コンピューターの手、じゃんけんの結果を"保存"する
  function saveResult(me, computer, result){
    const gameResult = {
      me,
      computer,
      result,
    };
    let history = JSON.parse(localStorage.getItem('jankenHistory'))  || [];
    history.push(gameResult);
    localStorage.setItem('jankenHistory', JSON.stringify(history));
  }

  // ボタンを押すと、自分&コンピューターの手、じゃんけんの結果を画面にリストで表示する
  function displayHistory() {
    const history = JSON.parse(localStorage.getItem('jankenHistory')) || [];
    const historyElement = $('#history');
    historyElement.empty();
    // 表示する内容
    history.forEach((game, index) => {
      const listItem = $('<li></li>').text(`${index + 1}. あなた: ${game.me}, コンピュータ: ${game.computer} - 結果: ${game.result}`);
      historyElement.append(listItem);
    });
  }

  // じゃんけんのメイン処理を実行する
  function playGame(me, computer, resultImage) {
    const resultMap = {
      'グー': { 7: '<img src="images/tyoki.png" alt="">', 4: '<img src="images/guu.png" alt="">', 1: '<img src="images/paa.png" alt="">' },
      'チョキ': { 7: '<img src="images/paa.png" alt="">', 4: '<img src="images/tyoki.png" alt="">', 1: '<img src="images/guu.png" alt="">' },
      'パー': { 7: '<img src="images/guu.png" alt="">', 4: '<img src="images/paa.png" alt="">', 1: '<img src="images/tyoki.png" alt="">' }
    };

    // じゃんけんメイン処理の結果に則り、履歴に何を表示させるかの処理を実行する
    let result;
    if (resultImage === 'win') {
      result = '勝ち';
    } else if (resultImage === 'lose') {
      result = '負け';
    } else {
      result = 'ひきわけ';
    }

    saveResult(me, computer, result);
    displayHistory();
  }

// 以下、btn1を押した場合の処理

$("#btn1").on('click', function(){
  const randomNumber = Math.ceil(Math.random() * 10);
  const me = 'グー';
  let computer, resultImage;

  if(randomNumber >= 7 && randomNumber <=10){
    computer = 'チョキ';
    resultImage = 'win';
    $('#result').html(`<img src="images/tyoki.png" alt="">`);
    $('#final-result').html(`<img src="images/win.png" alt="">`);

  } else if(randomNumber >= 4 && randomNumber <=6){
    computer = 'グー';
    resultImage = 'draw';
    $('#result').html(`<img src="images/guu.png" alt="">`);
    $('#final-result').html(`ひきわけ`);

  } else {
    computer = 'パー';
    resultImage = 'lose';
    $('#result').html(`<img src="images/paa.png" alt="">`);
    $('#final-result').html('<img src="images/lose.jpg" alt="">');
  }

  playGame(me, computer, resultImage);
});

// 以下、btn2を押した場合の処理
$('#btn2').on('click', function() {
  const me = 'チョキ';
  const randomNumber = Math.ceil(Math.random() * 10);
  let computer, resultImage;

  if (randomNumber >= 7 && randomNumber <= 10) {
    computer = 'パー';
    resultImage = 'win';
    $('#result').html(`<img src="images/paa.png" alt="">`);
    $('#final-result').html(`<img src="images/win.png" alt="">`);

  } else if (randomNumber >= 4 && randomNumber <= 6) {
    computer = 'チョキ';
    resultImage = 'draw';
    $('#result').html(`<img src="images/tyoki.png" alt="">`);
    $('#final-result').html(`ひきわけ`);

  } else {
    computer = 'グー';
    resultImage = 'lose';
    $('#result').html(`<img src="images/guu.png" alt="">`);
    $('#final-result').html('<img src="images/lose.jpg" alt="">');
  }

  playGame(me, computer, resultImage);
});

  // 以下、btn3を押した場合の処理
  $('#btn3').on('click', function() {
    const me = 'パー';
    const randomNumber = Math.ceil(Math.random() * 10);
    let computer, resultImage;

    if (randomNumber >= 7 && randomNumber <= 10) {
      computer = 'グー';
      resultImage = 'win';
      $('#result').html(`<img src="images/guu.png" alt="">`);
      $('#final-result').html(`<img src="images/win.png" alt="">`);

    } else if (randomNumber >= 4 && randomNumber <= 6) {
      computer = 'パー';
      resultImage = 'draw';
      $('#result').html(`<img src="images/paa.png" alt="">`);
      $('#final-result').html(`ひきわけ`);

    } else {
      computer = 'チョキ';
      resultImage = 'lose';
      $('#result').html(`<img src="images/tyoki.png" alt="">`);
      $('#final-result').html('<img src="images/lose.jpg" alt="">');
    }

    playGame(me, computer, resultImage);
  });

// リセットボタンを押した場合の処理
$('#resetbutton').on('click', function() {
  localStorage.removeItem('jankenHistory');
  $('#history').empty();
  $('#final-result').html('<img src="images/taikigamen.jpg" alt="">');
  location.reload();
});

// 初期表示
    displayHistory();

});

