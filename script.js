let deck = [];
let currentCard = 0;
let hand = [];
let level = 1;
let handCard = document.getElementById('handCard');
let cardContainer = document.getElementById('cardContainer');
let optionCard1 = document.getElementById('optionCard1');
let optionCard2 = document.getElementById('optionCard2');


function shuffleDeck() {
  deck = [];
  for (let i = 1; i <= 101; i++) {
    deck.push(i);
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// 抽牌函數
function drawCard() {
  handCard.style.display = 'none'; // 隱藏手牌抽牌按鈕
  let drawnCard = deck[currentCard++];
  hand = [drawnCard];
  let resultElement = document.getElementById('result');
  resultElement.innerHTML = `當前關卡: ${level}<br>你的手牌: ${hand[hand.length - 1]}`;
  optionCard1.style.display = 'flex';
  optionCard1.innerHTML = '大';
  optionCard1.addEventListener('click', BigClick);
  optionCard2.style.display = 'flex';
  optionCard2.innerHTML = '小';
  optionCard2.addEventListener('click', SmallClick);
}

function BigClick() {chooseOption('大');}
function SmallClick() {chooseOption('小');}


function chooseOption(choice) {
  let drawnCard = deck[currentCard++];
  let resultElement = document.getElementById('result');
  resultElement.innerHTML = `當前關卡: ${level}<br>你的手牌: ${hand[hand.length - 1]} 選擇了"${choice}"，抽到的牌: ${drawnCard}`;
  let compareResult = '';
  if ((choice === '大' && drawnCard > hand[hand.length - 1]) || (choice === '小' && drawnCard < hand[hand.length - 1])) {
    if(level === deck.length-1){
      resultElement.innerHTML = `恭喜完成${deck.length-1}關!`;
      restartGame()
      return;
    }
    compareResult = `獲勝<br>下一關，第${level+1}關<br> 新的手牌: ${drawnCard}`;
    level++;
  } else {
    compareResult = `闖關失敗！<br>完成了${level}關<br>重新開始`;
    restartGame()
  }
  hand.push(drawnCard);
  resultElement.innerHTML += `${compareResult}`;
  //獲勝率
  const result = deck.filter(item => !hand.includes(item));
  const suc = result.filter(item => item < drawnCard);
  optionCard1.innerHTML=`大<span>${(100-suc.length/result.length*100).toFixed(2)}%</span>`
  optionCard2.innerHTML=`小<span>${(suc.length/result.length*100).toFixed(2)}%</span>`
}

function restartGame() {
  optionCard1.style.display = 'none';
  optionCard2.style.display = 'none';
  handCard.style.lineHeight = '150px'
  handCard.style.display = 'block';
  optionCard1.removeEventListener('click', BigClick);
  optionCard2.removeEventListener('click', SmallClick);
  currentCard = 0;
  hand = [];
  level = 1;
  shuffleDeck();
}


document.addEventListener('DOMContentLoaded', function () {
  shuffleDeck();
});
