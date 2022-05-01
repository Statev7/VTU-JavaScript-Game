import { alert, isQuestionExist } from "../common/functions.js";

const questionElement =  document.getElementById('question');
const deleteBtnElement = document.getElementById('delete-btn');
const resetBtnElement = document.getElementById('reset-btn');

deleteBtnElement.addEventListener('click', deleteQuestion);
resetBtnElement.addEventListener('click', resetData);

function deleteQuestion(){

    let questionToDelete = questionElement.value;

    let isExist = isQuestionExist(questionToDelete);
    if (!isExist) {
        alert(`${questionToDelete} is not exist!`, 'unsuccessful');
        return;
    }

    let questionsAsArray = JSON.parse(localStorage.getItem('questions'));
    let index = indexOfQuestion(questionsAsArray, questionToDelete);

    questionsAsArray.splice(index, 1);
    localStorage.setItem('questions', JSON.stringify(questionsAsArray));

    alert(`Successfully deleted ${questionToDelete}`, 'successful');
}

function resetData(){
    localStorage.clear();
    alert('Successfully', 'successful');
}

function indexOfQuestion(questionsAsArray, questionToDelete){

    let indexOf = 0;

    questionsAsArray.forEach((x, i) => {
        if(x.question == questionToDelete){
            indexOf = i;
        }
    });

    return indexOf;
}
