import { alert } from "../common/functions.js";

const lowRank = 'Make more effort!';
const middleRank = 'You are good!';
const hightRank = 'Excellent!';

const middleRankLowerLimitRate = 50;
const middleRankHightLimitRate = 80;
const hightRankLowerLimitRate = 80;
const questionCount = JSON.parse(localStorage.getItem('questions')).length;

const statsElement = document.getElementById('stats');
const gameFormElement = document.getElementById('game-form');
const scoreElement = document.getElementById('score');
const rankElement = document.getElementById('rank');
const questionElement = document.getElementById('question');
const radioButtonsElements = document.getElementsByName('answer');
const aElement = document.getElementById('a');
const bElement = document.getElementById('b');
const cElement = document.getElementById('c');
const dElement = document.getElementById('d');
const submitBtn = document.getElementById('submitBtn');

let questionsAsArray = [];
let filteredQuestionArrray = [];
let randomIndex = 0;
let score = 0;

main();

function main(){
    loadQuiz();
}

function loadQuiz(){

    uncheckBtn();

    questionsAsArray = JSON.parse(localStorage.getItem('questions'));
    filteredQuestionArrray = questionsAsArray.filter(x => x.isUsed == false);

    setRandomIndex();
    const currentQuestion = filteredQuestionArrray[randomIndex];

    questionElement.textContent = currentQuestion.question;
    aElement.textContent = currentQuestion.a;
    bElement.textContent = currentQuestion.b;
    cElement.textContent = currentQuestion.c;
    dElement.textContent = currentQuestion.d;
}

function uncheckBtn(){
    radioButtonsElements.forEach(x => x.checked = false)
}

function setRandomIndex(){
    randomIndex = Math.floor(Math.random() * (filteredQuestionArrray.length - 0) ) + 0;
}

submitBtn.addEventListener('click', function() {
    
    const userAnswer = getSelectAnswer();
    if(userAnswer == ''){
        alert('Choose an answer!', 'warning')
        return;
    }

    const currentQuestion = filteredQuestionArrray[randomIndex];

    //Update question entity
    const index = questionsAsArray.indexOf(currentQuestion);
    questionsAsArray[index].isUsed = true;
    localStorage.setItem('questions', JSON.stringify(questionsAsArray));

    if(userAnswer === currentQuestion.correctAnswer){
        score++;
    }

    const isQuizEnd = questionsAsArray.filter(x => x.isUsed == false).length <= 0;
    if (isQuizEnd) {
        resetGame();
    }

    loadQuiz();
});

function getSelectAnswer(){
    let answer = '';
    radioButtonsElements.forEach(x => {
        if (x.checked) {
            answer = x.value;
        }
    })

    return answer;
}

function resetGame(){
    const rank = determineRank();
        
    gameFormElement.style.display = 'none';
    statsElement.style.display = 'block';
    scoreElement.textContent = `Score: ${score}/${questionCount}`;
    rankElement.textContent = `Rank: ${rank}`;

    questionsAsArray.forEach(x => x.isUsed = false);
    localStorage.setItem('questions', JSON.stringify(questionsAsArray));
}

function determineRank(){
    let rank = lowRank;
    const rate = (score / questionCount) * 100;

    if (rate >= middleRankLowerLimitRate && rate < middleRankHightLimitRate) {
        rank = middleRank;
    }else if(rate > hightRankLowerLimitRate){
        rank = hightRank;
    }

    return rank;
}