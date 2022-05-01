import { alert, isQuestionExist } from "../common/functions.js";

const userInputElements = document.querySelectorAll('#create-question-form input[type=text]');
const createButtonElement = document.getElementById('create-question-btn');
const errorMessagesElement = document.getElementById('errors-output');

createButtonElement.addEventListener('click', createQuestion);

function createQuestion(){
    
    errorMessagesElement.textContent = '';

    let isInvalid = validateInput();
    if(isInvalid == false){
        return;
    }

    let question = userInputElements[0].value;
    let isExist = isQuestionExist(question);
    if(isExist){
        alert(`The ${question} already exist!`, 'unsuccessful');
        return;
    }

    let userQuestion = {};
    userQuestion.question = question;
    userQuestion.a = userInputElements[1].value;
    userQuestion.b = userInputElements[2].value;
    userQuestion.c = userInputElements[3].value;
    userQuestion.d = userInputElements[4].value;
    userQuestion.correctAnswer = userInputElements[5].value;
    userQuestion.isUsed = false;

    let questionsAsArray = JSON.parse(localStorage.getItem('questions'));
    questionsAsArray.push(userQuestion);
    localStorage.setItem('questions', JSON.stringify(questionsAsArray));

    alert('Successfully created a new question!', 'successful')
    userInputElements.forEach(x => x.value = '');
}

function validateInput(){

    let isValid = true;
    let errorMessage = '';
    let errorMessagesAsArray = [];
    const validAnswers = ['a', 'b', 'c', 'd'];

    userInputElements.forEach(x => {
        if(x.value == ''){
            errorMessage = `${x.getAttribute("placeholder")} cannot be null`;
            errorMessagesAsArray.push(errorMessage);
        }
    });

    let correctAnswerValue = userInputElements[userInputElements.length - 1].value;

    let isUserCorrectAnswerValid = validAnswers.includes(correctAnswerValue);
    if (isUserCorrectAnswerValid == false && correctAnswerValue) {
        errorMessage = `The correct answer cannot be different from the following: ${validAnswers.join(', ')}`;
        errorMessagesAsArray.push(errorMessage);
    }

    if(errorMessage){
        
        let ul = document.createElement('ul');
        errorMessagesElement.appendChild(ul);

        errorMessagesAsArray.forEach(x =>{
            let li = document.createElement('li');
            li.textContent = x;
            li.style.color = 'red';
            ul.appendChild(li);
        })

        isValid = false;
    }

    return isValid;
}