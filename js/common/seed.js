let isNull = localStorage.key('questions') == null;

if(isNull){
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

    let question1 = new Question('Коя е столицата на България?', 'София', 'Пловдив', 'В. Търново', 'Варна', 'a', false);
    let question2 = new Question('Кой е вторият по големина град в България?', 'Варна', 'София', 'Пловдив', 'Бургас', 'c', false);
    let question3 = new Question('Кой е най-високият връх в България?', 'Вихрен', 'Ботев', 'Българка', 'Мусала', 'd', false);
    let question4 = new Question('Коя е най-дългата река в България?', 'Искър', 'Марица', 'Янтра', 'Места', 'a', false);

    let questionArray = [question1, question2, question3, question4];

    localStorage.setItem('questions', JSON.stringify(questionArray));
}