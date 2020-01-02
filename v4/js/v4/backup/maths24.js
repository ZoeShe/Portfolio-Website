// SELECT DIFFICULTY AND CARDS
const originalCards = [
  {cId: 's1', cValue: 1}, {cId: 'h1', cValue: 1}, {cId: 'c1', cValue: 1}, {cId: 'd1', cValue: 1},
  {cId: 's2', cValue: 2}, {cId: 'h2', cValue: 2}, {cId: 'c2', cValue: 2}, {cId: 'd2', cValue: 2},
  {cId: 's3', cValue: 3}, {cId: 'h3', cValue: 3}, {cId: 'c3', cValue: 3}, {cId: 'd3', cValue: 3},
  {cId: 's4', cValue: 4}, {cId: 'h4', cValue: 4}, {cId: 'c4', cValue: 4}, {cId: 'd4', cValue: 4},
  {cId: 's5', cValue: 5}, {cId: 'h5', cValue: 5}, {cId: 'c5', cValue: 5}, {cId: 'd5', cValue: 5},
  {cId: 's6', cValue: 6}, {cId: 'h6', cValue: 6}, {cId: 'c6', cValue: 6}, {cId: 'd6', cValue: 6},
  {cId: 's7', cValue: 7}, {cId: 'h7', cValue: 7}, {cId: 'c7', cValue: 7}, {cId: 'd7', cValue: 7},
  {cId: 's8', cValue: 8}, {cId: 'h8', cValue: 8}, {cId: 'c8', cValue: 8}, {cId: 'd8', cValue: 8},
  {cId: 's9', cValue: 9}, {cId: 'h9', cValue: 9}, {cId: 'c9', cValue: 9}, {cId: 'd9', cValue: 9},
  {cId: 's10', cValue: 10}, {cId: 'h10', cValue: 10}, {cId: 'c10', cValue: 10}, {cId: 'd10', cValue: 10},
  {cId: 's11', cValue: 11}, {cId: 'h11', cValue: 11}, {cId: 'c11', cValue: 11}, {cId: 'd11', cValue: 11},
  {cId: 's12', cValue: 12}, {cId: 'h12', cValue: 12}, {cId: 'c12', cValue: 12}, {cId: 'd12', cValue: 12},
  {cId: 's13', cValue: 13}, {cId: 'h13', cValue: 13}, {cId: 'c13', cValue: 13}, {cId: 'd13', cValue: 13},
];

// sort cards
let cardNumber = 40;
let cards = [];
function selectCards(){
  for (let i = 0; i < cardNumber; i++) {  
    cards.push(originalCards[i]);
  }
}
selectCards();

function setCards(){
  cards = [];
  selectCards();
  countCardNumber.textContent = `${cards.length}`;
}

// toggle difficulty display
const switcher = document.querySelector('#switcher');
const countCardNumber =  document.querySelector('#counter-number');
function switchDifficulty(){
  if (cardNumber === 40) {
    switcher.className = 'hard';
    switcher.textContent = 'HARD';
    cardNumber = 52;
  } else if (cardNumber === 52) {
    switcher.className = 'easy';
    switcher.textContent = 'EASY';
    cardNumber = 40;
  } else {
    alert('Illeague Operation');
    return;
  }
  setCards();
}
function chooseDifficulty(){
  if (isStarted === true) {
    questionStartNewGame('newDifficulty');
  } else {
    switchDifficulty();
  }
}


const btnDifficulty = document.querySelector('#difficulty');
btnDifficulty.addEventListener('click', chooseDifficulty);

// Next Button
function startFirst() {
  messageBoxToggle(true);
  message.textContent = 'Start the game first.';
  clickError();
}

function outOfCards() {
  messageBox.style.display = 'block';
  message.textContent = 'Finish the game?';
  btnYes.textContent = ' YES ';
  btnYes.addEventListener('click', gameFinished);
  btnNo.textContent = ' NO ';
  btnNo.addEventListener('click', function(){
    messageBoxToggle(false);
    return;
  });
}

function dealCards(cardId){
  let selectedCardIndex = parseInt(Math.random()*cards.length);
  let selectedCardId = cards[selectedCardIndex].cId;
  let selectedCardValue = cards[selectedCardIndex].cValue;
  document.getElementById(cardId).value = selectedCardValue;
  cards.splice(selectedCardIndex, 1);
  let cardImage = document.getElementById(cardId+'-img');
  cardImage.src = `media/maths24/img/${selectedCardId}.png`;
  cardImage.alt = selectedCardValue;
}

function nextCards(){
  if (cards.length <= 0) {
    outOfCards();
  } else {
    if (isStarted === false) {
      startFirst();
      return;
    } else if (cards.length <= 4){
      btnNext.className = 'finish';
      btnNext.textContent = 'FINISH';
    } 
    dealCards('card-1');
    dealCards('card-2');
    dealCards('card-3');
    dealCards('card-4');
    countCardNumber.textContent = `${cards.length}`;
    clear();
  }
}
const btnNext = document.querySelector('#next');
btnNext.addEventListener('click', nextCards);

// Start Button
let isStarted = false;
function startGame() {
  messageBoxToggle(false);
  if (isStarted === false) {
    isStarted = true;
    nextCards();
    timerStart();
    btnStart.textContent = 'RESET';
    btnStart.className = 'reset';
  }  else {
    questionStartNewGame('newGame');
  }
}

const btnStart = document.querySelector('#start');
btnStart.addEventListener('click', startGame);


function reset(){
  isStarted = false;
  score = 0;
  let cardImages = document.querySelectorAll('.card-img');
  let cardBtns = document.querySelectorAll('.card-btn'); 
  for (let i = 0; i < 4; i++) {
    cardImages[i].src = 'media/maths24/img/0-back-2.png';
    cardImages[i].alt = '';
    cardBtns[i].value = '';
  }
  btnStart.textContent = 'START';
  btnStart.className = 'start';
  // switcher.className = 'easy';
  // switcher.textContent = 'EASY';
  messageOuterBox.style.height = '25px';
  // cardNumber = 40;
  setCards();
  clear();
  timerStop();
  timerClear();
}

function resetDifficulty(){
  reset();
  switchDifficulty();
}

// clear 
function clear(){
  barDisplay.value = '';
  calculation = '';
  solvedScore.textContent = score;
  isUsedCard1 = false;
  isUsedCard2 = false;
  isUsedCard3 = false;
  isUsedCard4 = false;
  messageBoxToggle(false);
}
const btnClear = document.getElementById('clear');
btnClear.addEventListener('click', clear)


function clearWhenError(){
  setTimeout(function(){
    barDisplay.value = '';
    calculation = '';
  }, 2000);
  isUsedCard1 = false;
  isUsedCard2 = false;
  isUsedCard3 = false;
  isUsedCard4 = false;
  // messageBoxToggle(false);
}

// message box
const message = document.querySelector('#message');
const messageBox = document.querySelector('#message-box');
const btnYes = document.querySelector('#message-yes');
const btnNo = document.querySelector('#message-no');
const messageOuterBox = document.querySelector('#message-outer-box');
let messageDisplay = false;

function messageBoxToggle(messageDisplay) {
  if (messageDisplay === false ) {
    messageBox.style.display = 'none';
    btnYes.textContent = '';
    btnNo.textContent = ''; 
  } else if (messageDisplay === true ){
    messageBox.style.display = 'block';
    setTimeout(function(){
      messageBox.style.display = 'none';
      btnYes.textContent = '';
      btnNo.textContent = ''; 
    }, 2000);
  }
}

function questionStartNewGame(mode) {
  messageBoxToggle(true);
  message.textContent = 'Start a new game? ';
  btnYes.textContent = ' YES ';
  if (mode === 'newDifficulty') {
    btnYes.addEventListener('click', resetDifficulty);
  } else {
    btnYes.addEventListener('click', reset);
  }
  btnNo.textContent = ' NO ';
  btnNo.addEventListener('click', function(){
    messageBoxToggle(false);
    return;
  });
}

//calculation & barDisplay
const barDisplay = document.querySelector('#display')

let isUsedCard1 = false;
let isUsedCard2 = false;
let isUsedCard3 = false;
let isUsedCard4 = false;

let calcBtnArray = document.querySelectorAll('.calc');
let newCalcBtnArray = [];
let calculation = '';

for (let i = 0; i < calcBtnArray.length; i++) {
  newCalcBtnArray.push(calcBtnArray[i].id);
}
newCalcBtnArray.forEach(function(btnId){
  let clickedBtn = document.getElementById(btnId);
  clickedBtn.addEventListener('click', function(){
    if (isStarted === false) {
      startFirst();
      return;
    } else {
      if (
        btnId === 'card-1' && isUsedCard1 ||
        btnId === 'card-2' && isUsedCard2 ||
        btnId === 'card-3' && isUsedCard3 ||
        btnId === 'card-4' && isUsedCard4 ) {
          messageBoxToggle(true);
          message.textContent = 'This card is used once.'
          clickError();
          clearWhenError();
          return; 
      } else {
        messageBoxToggle(false);
        if (btnId === 'card-1' && !isUsedCard1) {
          isUsedCard1 = true;
          barDisplay.value += clickedBtn.value;
        } else if (btnId === 'card-2' && !isUsedCard2) {
          isUsedCard2 = true;
          barDisplay.value += clickedBtn.value;
        } else if (btnId === 'card-3' && !isUsedCard3) {
          isUsedCard3 = true;
          barDisplay.value += clickedBtn.value;
        } else if (btnId === 'card-4' && !isUsedCard4) {
          isUsedCard4 = true;
          barDisplay.value += clickedBtn.value;
        } else {
          barDisplay.value += clickedBtn.textContent;
        }
        calculation += clickedBtn.value;
        return calculation;
      }
    }
  });
});


// evaluate
const solvedScore = document.querySelector('#solved');
let score = 0;

function evaluate() {
  if (isStarted === false) {
    startFirst();
    return;
  } else {
    if (calculation == false) {
      barDisplay.value = '';
    } else {
      let result = eval(calculation);
      barDisplay.value = result;
      if (result === 24 && isUsedCard1 && isUsedCard2 && isUsedCard3 && isUsedCard4) {
        if (cards.length <= 0) {
          gameFinished();
        } else {
          messageBoxToggle(true);
          message.textContent = 'GOOD JOB!';
          score += 1;
          solvedScore.textContent = score;
          clickBingo();
          nextCards();
          return score;
        }
      } else if (!isUsedCard1 || !isUsedCard2 || !isUsedCard3 || !isUsedCard4){
        messageBoxToggle(true);
        message.textContent = 'Each card must be used once!';
        clickError();
        clearWhenError();
        return;
      } else {
        messageBoxToggle(true);
        message.textContent = 'Ooops! Not 24!';
        clickError();
        clearWhenError();
        return;
      }
    }
  }
}

// function evaluate() {
//   if (isStarted === false) {
//     startFirst();
//     return;
//   } else {
//     let result = eval(calculation);
//     barDisplay.value = result;
//     messageBoxToggle(true);
//     if (result === 24 && isUsedCard1 && isUsedCard2 && isUsedCard3 && isUsedCard4) {
//       if (cards.length <= 0) {
//         gameFinished();
//       } else {
//         message.textContent = 'GOOD JOB!';
//         score += 1;
//         solvedScore.textContent = score;
//         clickBingo();
//         nextCards();
//         return score;
//       }
//     } else if (!isUsedCard1 || !isUsedCard2 || !isUsedCard3 || !isUsedCard4){
//       message.textContent = 'Each card must be used once!';
//       clickError();
//       clearWhenError();
//       return;
//     } else {
//       message.textContent = 'Ooops! Not 24!';
//       clickError();
//       clearWhenError();
//       return;
//     }
//   }
// }


const btnEqual = document.getElementById('equal');
btnEqual.addEventListener('click', evaluate)

// refine details and play more
// design home page picture better gif


let timer = document.getElementById('timer');
let seconds = 0; 
let minutes = 0;
let t;
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    timer.textContent = 
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + `'` + 
    (seconds > 9 ? seconds : "0" + seconds) + `"`;
    timerStart();
}
function timerStart() {
  t = setTimeout(add, 1000);
}
function timerStop() {
    clearTimeout(t);
}
function timerClear() {
    timer.textContent = `00'00"`;
    seconds = 0; 
    minutes = 0; 
}

function gameFinished() {
  timerStop();
  messageBox.style.display = 'block';
  btnYes.textContent = ' YES ';
  btnYes.addEventListener('click', reset);
  btnNo.textContent = ' NO ';
  btnNo.addEventListener('click', function(){
    messageBoxToggle(false);
    messageOuterBox.style.height = '25px';
    return;
  });
  messageOuterBox.style.height = '50px';
  if (score <= 1) {
    endGameMessage = `${score} Problem Solved in ${timer.textContent}!`;
  } else {
    endGameMessage = `${score} Problems Solved in ${timer.textContent}!`;
  } 
  message.innerHTML = endGameMessage + '<br />Try Again?';
  btnNext.className = 'next';
  btnNext.textContent = 'NEXT';
}

