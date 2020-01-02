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

// Variables
const switcher = document.querySelector('#switcher');
const countCardNumber =  document.querySelector('#counter-number');
const btnDifficulty = document.querySelector('#difficulty');
const btnNext = document.querySelector('#next');
const btnStart = document.querySelector('#start');
const btnClear = document.getElementById('clear');
const message = document.querySelector('#message');
const messageBox = document.querySelector('#message-box');
const btnYes = document.querySelector('#message-yes');
const btnNo = document.querySelector('#message-no');
const messageOuterBox = document.querySelector('#message-outer-box');
const barDisplay = document.querySelector('#display');
const solvedScore = document.querySelector('#solved');
const btnEqual = document.getElementById('equal');
const calcBtnArray = document.querySelectorAll('.calc'); //? let?
const timer = document.getElementById('timer'); //? let?
const leftRacket = document.getElementById('l-rkt');

let newCalcBtnArray = [];
let cardNumber = 40;
let cards = [];
let score = 0;
let seconds = 0; 
let minutes = 0;
let t;
let calculation = '';
let barDisplayArray = [];
let calculationArray = [];
let lastCalcIndex;

let isStarted = false;
let isUsedCard1 = false;
let isUsedCard2 = false;
let isUsedCard3 = false;
let isUsedCard4 = false;
let messageDisplay = false;
let isClosedBraket = 0;

// addEventListner
btnDifficulty.addEventListener('click', chooseDifficulty);
btnNext.addEventListener('click', nextCards);
btnStart.addEventListener('click', startGame);
btnClear.addEventListener('click', clear)
btnEqual.addEventListener('click', evaluate)

// message & addEventListner
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

// .calc addEventListner
function updateCalcIndex(){
  lastCalcIndex = (calculationArray.length > 0) ? (calculationArray.length - 1) : 0;
}
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
          // clearWhenError();
          return; 
      } else {
        if (btnId === 'card-1'|| btnId === 'card-2' || btnId === 'card-3' || btnId === 'card-4'){
          if (calculationArray == false || 
            typeof(calculationArray[lastCalcIndex]) !== 'number' &&
            calculationArray[lastCalcIndex] !== ')'
          ) {
            if (btnId === 'card-1' && !isUsedCard1) {
              isUsedCard1 = true;
            } else if (btnId === 'card-2' && !isUsedCard2) {
              isUsedCard2 = true;
            } else if (btnId === 'card-3' && !isUsedCard3) {
              isUsedCard3 = true;
            } else if (btnId === 'card-4' && !isUsedCard4) {
              isUsedCard4 = true;
            }
            barDisplayArray.push(+clickedBtn.value);
            calculationArray.push(+clickedBtn.value);
            updateCalcIndex();
            canBeCalculated = true;
          } else {
            messageBoxToggle(true);
            message.textContent = 'Add an operator first!';
            clickError();
          }
        }
        else if (btnId === 'add' || btnId === 'subtract' || btnId ==='multiply' || btnId ==='divide') {
          if (calculationArray != false && 
            calculationArray[lastCalcIndex] !== '(' &&
            calculationArray[lastCalcIndex] !== '+' && 
            calculationArray[lastCalcIndex] !== '-' &&
            calculationArray[lastCalcIndex] !== '*' &&
            calculationArray[lastCalcIndex] !== '/'
          ) {
            barDisplayArray.push(clickedBtn.textContent);
            calculationArray.push(clickedBtn.value);
            updateCalcIndex();
            canBeCalculated = false;
          } else {
            messageBoxToggle(true);
            message.textContent = 'Can not add operator here!';
            clickError();
          }
        }
        else if (btnId === 'r-rkt') {
          if ( calculationArray != false && 
            isClosedBraket >= 1 &&
            calculationArray[lastCalcIndex] !== '(' && 
            calculationArray[lastCalcIndex] !== '+' && 
            calculationArray[lastCalcIndex] !== '-' &&
            calculationArray[lastCalcIndex] !== '*' &&
            calculationArray[lastCalcIndex] !== '/'
          ) {
            barDisplayArray.push(clickedBtn.textContent);
            calculationArray.push(clickedBtn.value);
            updateCalcIndex();
            canBeCalculated = true;
            isClosedBraket -= 1;
          } else {
            messageBoxToggle(true);
            message.textContent = 'Can not close braket here!';
            clickError();
          }
        }
        else if (btnId === 'l-rkt') {
          if (calculationArray != false &&
            (typeof(calculationArray[lastCalcIndex]) == 'number' ||
            calculationArray[lastCalcIndex] === ')')
          ) {
            barDisplayArray.push(clickedBtn.textContent);
            calculationArray.push('*(');
          } else {
            barDisplayArray.push('(');
            calculationArray.push('(');
          }
          updateCalcIndex();
          canBeCalculated = false;
          isClosedBraket += 1;
        } else {return;}
        copyToString();
      }
    }
  });
});

function copyToString(){
  barDisplay.value = barDisplayArray.toString().replace(/,/g, '');
  calculation = calculationArray.toString().replace(/,/g, '');
}

// message box
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

// sort cards
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

// Next Button
function startFirst() {
  messageBoxToggle(true);
  message.textContent = 'Start the game first.';
  clickError();
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

// Start Button
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

// clear 
function clear(){
  barDisplayArray = [];
  calculationArray = [];
  copyToString();
  solvedScore.textContent = score;
  isUsedCard1 = false;
  isUsedCard2 = false;
  isUsedCard3 = false;
  isUsedCard4 = false;
  // messageBoxToggle(false);
  canBeCalculated = true;
  isClosedBraket = 0;
}

function clearWhenError(){
  setTimeout(function(){
    barDisplayArray = [];
    calculationArray = [];
    copyToString();
  }, 2000);
  isUsedCard1 = false;
  isUsedCard2 = false;
  isUsedCard3 = false;
  isUsedCard4 = false;
  // messageBoxToggle(false);
}

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
  messageOuterBox.style.height = '25px';
  messageBoxToggle(false);
  setCards();
  clear();
  timerStop();
  timerClear();
}

function resetDifficulty(){
  reset();
  switchDifficulty();
}

// evaluate
function evaluate() {
  if (isStarted === false) {
    startFirst();
    return;
  } else if (!canBeCalculated || isClosedBraket !== 0) {
    clickError();
    messageBoxToggle(true);
    message.textContent = 'Broken Formula';
  } else {
    if (calculation == false) {
      barDisplayArray = [];
    } else {
      let result = eval(calculation);
      if (result === 24 && isUsedCard1 && isUsedCard2 && isUsedCard3 && isUsedCard4) {
        barDisplay.value = result;
        score += 1;
        solvedScore.textContent = score;
        if (cards.length <= 0) {
          wellDone();
          gameFinished();
        } else {
          clickBingo();
          messageBoxToggle(true);
          message.textContent = 'GOOD JOB!';
          nextCards();
        }
        return score;
      } else if (!isUsedCard1 || !isUsedCard2 || !isUsedCard3 || !isUsedCard4){
        messageBoxToggle(true);
        message.textContent = 'Each card must be used once!';
        clickError();
        // clearWhenError();
        return;
      } else {
        barDisplay.value = result;
        messageBoxToggle(true);
        message.textContent = 'Ooops! Not 24!';
        clickError();
        clearWhenError();
        return;
      }
    }
  }
}

function timeAdd() {
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
  t = setTimeout(timeAdd, 1000);
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
  btnNo.textContent = '';
  // btnNo.addEventListener('click', function(){
  //   messageBoxToggle(false);
  //   messageOuterBox.style.height = '25px';
  //   return;
  // });
  messageOuterBox.style.height = '50px';
  if (score <= 1) {
    endGameMessage = `${score} Problem Solved in ${timer.textContent}!`;
  } else {
    endGameMessage = `${score} Problems Solved in ${timer.textContent}!`;
  } 
  message.innerHTML = endGameMessage + '<br />Try Again?';
  btnNext.className = 'next';
  btnNext.textContent = 'NEXT';
  return;
}