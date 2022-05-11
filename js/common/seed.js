const questions = JSON.parse(localStorage.getItem('questions'));
const isEmpty = questions == null || questions.length == 0;

if(isEmpty){
    seedData();
}

function seedData(){

    class Question {
        constructor(question, a, b, c, d, correctAnswer, isUsed){
            this.question = question;
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.correctAnswer = correctAnswer;
            this.isUsed = isUsed;
        }
    }

    const question1 = new Question('Коя е столицата на България?', 'София', 'Пловдив', 'В. Търново', 'Варна', 'a', false);
    const question2 = new Question('Кой е вторият по големина град в България?', 'Варна', 'София', 'Пловдив', 'Бургас', 'c', false);
    const question3 = new Question('Кой е най-високият връх в България?', 'Вихрен', 'Ботев', 'Българка', 'Мусала', 'd', false);
    const question4 = new Question('Коя е най-дългата река в България?', 'Искър', 'Марица', 'Янтра', 'Места', 'a', false);

    const questionArray = [question1, question2, question3, question4];

    localStorage.setItem('questions', JSON.stringify(questionArray));
}