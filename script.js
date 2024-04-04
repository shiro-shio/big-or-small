let deck = [];
let currentCard = 0;
let hand = [];
let level = 1;
const handCard = document.getElementById('handCard');
const cardContainer = document.getElementById('cardContainer');
const optionCard1 = document.getElementById('optionCard1');
const optionCard2 = document.getElementById('optionCard2');
let iscore = 100
let cipher = false

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
  document.getElementById('score').innerText=100;
  handCard.style.display = 'none';
  let drawnCard = deck[currentCard++];
  hand = [drawnCard];
  let resultElement = document.getElementById('result');
  let lv = document.getElementById('lv');
  lv.innerHTML = `關卡: ${level}`
  resultElement.innerHTML = `你的手牌: ${hand[hand.length - 1]}`;
  optionCard1.style.display = 'flex';
  optionCard1.innerHTML = '大';
  optionCard1.addEventListener('click', BigClick);
  optionCard2.style.display = 'flex';
  optionCard2.innerHTML = '小';
  optionCard2.addEventListener('click', SmallClick);
}

function BigClick() {chooseOption('大');}
function SmallClick() {chooseOption('小');}


const buttons = document.querySelectorAll('.bt1');
// 監聽按鈕點擊事件
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const valueChange = parseInt(button.value);
        const score = document.getElementById('score');
        const curscore = parseInt(score.innerText,10);
        const bet = parseInt(document.getElementById('bet').value.trim(),10)
        let tot = bet+valueChange
        if (tot<100){
          tot = 100
        }else if(tot > curscore){
          tot = curscore
        }
        document.getElementById('bet').value = tot
    });
});


function chooseOption(choice) {
  const score = document.getElementById('score');
  let lv = document.getElementById('lv');
  let curscore = parseInt(score.innerText,10);
  let resultElement = document.getElementById('result');
  const bet = parseInt(document.getElementById('bet').value.trim(),10)

  if (curscore <= 0) {
    resultElement.innerText = '沒分數了'

    restartGame()
    return;
  } else if ((bet > curscore) || (bet <= 0)) {
    resultElement.innerText = '分數 > 下注 > 0'
    return;
  } else {
    resultElement.innerText = ''
  }

  let drawnCard = deck[currentCard++];
  lv.innerHTML = `關卡: ${level}`
  resultElement.innerHTML = `你的手牌: ${hand[hand.length - 1]} 選擇"${choice}"，獲得的牌: ${drawnCard}<br>`;
  let compareResult = '';

  if ((choice === '大' && drawnCard > hand[hand.length - 1]) || (choice === '小' && drawnCard < hand[hand.length - 1])) {
    iscore += bet
    score.innerText = iscore
    compareResult = `獲勝! 增加${bet}<br>第${level + 1}關 新的手牌: ${drawnCard}`;
  } else {
    iscore -= bet
    compareResult = `失敗! 扣除${bet}<br>第${level + 1}關 新的手牌: ${drawnCard}`;
    if (iscore <= 0) {
      score.innerText = iscore
      resultElement.innerHTML += `新的手牌: ${drawnCard}<br>輸光了!!`
      restartGame()
      return;
    }
  }
  if((level === 15)||(level === deck.length-1)){
    resultElement.innerHTML += `新的手牌: ${drawnCard}<br>恭喜完成${level}關!`;
    restartGame()
    return;
  }
  level++;
  hand.push(drawnCard);
  resultElement.innerHTML += `${compareResult}`;
  //獲勝率
  if(cipher){
    const result = deck.filter(item => !hand.includes(item));
    const suc = result.filter(item => item < drawnCard);
    optionCard1.innerHTML=`大<span style="font-size: 10px;">${(100-suc.length/result.length*100).toFixed(2)}%</span>`
    optionCard2.innerHTML=`小<span style="font-size: 10px;">${(suc.length/result.length*100).toFixed(2)}%</span>`
  }
}

function sharescore(){
  const shareDiv = document.getElementById('share');
  const existingShareButton = document.getElementById('x_share');
  if (existingShareButton) {
      shareDiv.removeChild(existingShareButton);
  }
  const twitterShareButton = document.createElement('a');
  twitterShareButton.id = 'x_share';
  twitterShareButton.className = 'twitter-share-button';
  twitterShareButton.href = `https://twitter.com/intent/tweet?via=shiroshio0507&url=${window.location.href}&hashtags=大或小&text=遊戲中獲得了${iscore}分`;
  twitterShareButton.textContent = '分享到 X(Twitter)';
  shareDiv.appendChild(twitterShareButton);
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
  sharescore()
  iscore = 100;
  shuffleDeck();
}


document.addEventListener('DOMContentLoaded', function () {
  shuffleDeck();
});
