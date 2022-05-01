function alert(message, type){

    const messageElement = document.createElement('span');
  
    messageElement.textContent = message;
    messageElement.style.cssText = "position: absolute; right: 8px; top: 8px; color: white; padding: 20px; border-radius: 5px;";
    
    switch (type) {
        case 'successful':
          messageElement.style.background = 'green';
          break;
        case 'unsuccessful':
          messageElement.style.background = 'red';
          break;
        case 'warning':
          messageElement.style.background = 'yellow';
          messageElement.style.color = 'black';
          break;
    }
  
    document.body.appendChild(messageElement);
  
    setTimeout(function () {
      document.body.removeChild(messageElement);
    }, 3000);
}

function isQuestionExist(question){

  let isExist = false;
  let questionsAsArray = JSON.parse(localStorage.getItem('questions'));
  
  if(questionsAsArray){
    questionsAsArray.forEach(x => {
      if (x.question == question) {
        isExist = true;
      }
    });
  }

  return isExist;
}

export{
    alert,
    isQuestionExist
}