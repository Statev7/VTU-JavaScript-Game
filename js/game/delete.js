import { alert } from "../common/functions.js";

const selectBoxElement =  document.getElementById('questions');
const deleteBtnElement = document.getElementById('delete-btn');
let questionsAsArray = JSON.parse(localStorage.getItem('questions'));

deleteBtnElement.addEventListener('click', deleteQuestion);

loadQuestions();

function loadQuestions(){
    for (let index = 0; index < questionsAsArray.length; index++) {

        let option = document.createElement('option');
        option.textContent = questionsAsArray[index].question;
        selectBoxElement.appendChild(option);
    }
}

function deleteQuestion(){

    if (questionsAsArray.length == 1) {
        alert('The application must have at least one question available', 'warning');
        return;
    }

    let questionToDelete = getSelectedQuestion();
    let index = indexOfQuestion(questionToDelete);

    questionsAsArray.splice(index, 1);
    localStorage.setItem('questions', JSON.stringify(questionsAsArray));

    alert(`Successfully deleted: "${questionToDelete}"`, 'successful');
}

function getSelectedQuestion() {
    let questionToDelete;
    for (let index = 0; index < selectBoxElement.options.length; index++) {
        const option = selectBoxElement.options[index];
        if (option.selected === true) {
            questionToDelete = option.value;
            selectBoxElement.remove(index);
            break;
        }
    }
    return questionToDelete;
}

function indexOfQuestion(questionToDelete){

    let indexOf = 0;

    questionsAsArray.forEach((x, i) => {
        if(x.question == questionToDelete){
            indexOf = i;
        }
    });

    return indexOf;
}
