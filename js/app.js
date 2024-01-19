'use strict';

let score = 0;

const bioQuestions = [
  {
    question: 'Is my favorite color orange?',
    answer: 'yes',
    congratulate: 'My favorite color is orange! Good Job!',
    giveAnswer: 'No, my favorite color is orange!',
    questionType: 'YN'
  },
  {
    question: 'Do I have any experience in JavaScript?',
    answer: 'no',
    congratulate: 'Awesome! I really am new to JavaScript!',
    giveAnswer: 'I didn\'t know a lick of JavaScript until I started classes.',
    questionType: 'YN'
  },
  {
    question: 'Do I want to become a developer?',
    answer: 'yes',
    congratulate: 'Yep! I want to write amazing software!',
    giveAnswer: 'No, I really do want to become a great developer!',
    questionType: 'YN'
  },
  {
    question: 'Is my family my rock?',
    answer: 'yes',
    congratulate: 'You\'re right! My family is absolutely my rock.',
    giveAnswer: 'No, my family is my world.',
    questionType: 'YN'
  },
  {
    question: 'Do I like games?',
    answer: 'yes',
    congratulate: 'I love games, from board games to xbox!',
    giveAnswer: 'Who doesn\'t like games! I know I sure do! =)',
    questionType: 'YN'
  },
  {
    question: 'I am thinking of a number between 1-10, what is it?',
    answer: Math.floor(Math.random() * (10 - 1 + 1) + 1),
    questionType: 'INT',
    allowedAttempts: 4
  },
  {
    question: 'What is one of my FAVORITE movies?',
    answer: ['Demolition Man', 'Judge Dredd', 'Dredd', 'Total Recall', 'Moon',
      'The Fifth Element', '47 Ronin', 'Lord of the Rings', 'The Hobbit', 'Con Air'],
    congratulate: 'You nailed it! Congrats!',
    questionType: 'MC',
    allowedAttempts: 6
  }
];

function askGenericQuestions(questions) {
  for (const q of questions) {
    let answer;
    switch (q.questionType) {
    case 'YN':
      answer = sanitizeInput(promptUser(q.question), 'str');
      while (answer === '' || answer === null || answer !== 'yes' && answer !== 'no'){
        answer = sanitizeInput(promptUser(q.question + ' Valid input: yes/no or y/n'), 'str');
      }
      if (answer === q.answer) {
        score++;
        messageUser(q.congratulate);
      } else {
        messageUser(q.giveAnswer);
      }
      break;
    case 'TF':
      answer = promptUser(q.question);
      break;
    case 'INT': {
      let tracker = 0;
      while(tracker <= q.allowedAttempts - 1) {
        answer = parseInt(promptUser(q.question));
        if(answer === q.answer) {
          score++;
          messageUser('You got the number in ' +(tracker + 1)+ ' tries!');
          break;
        } else if (tracker >= q.allowedAttempts - 1){
          messageUser('Sorry you didn\'t get it! The number was ' + q.answer );
          break;
        } else {
          if (answer > q.answer){
            messageUser('My number is less than ' +answer+ '.');
          }
          if (answer < q.answer){
            messageUser('My number is greater than ' +answer+ '.');
          } else if (!Number.isInteger(answer) || answer > 10){
            messageUser('Try to use a number between 1-10');
          }
        }
        tracker++;
      }
      break;
    }
    case 'MC': {
      let gotIt = false;
      let tries = q.allowedAttempts;
      while (tries > 0 && gotIt !== true){
        answer = promptUser(q.question);
        if (answer === null){
          answer = '';
        }
        answer = answer.toLowerCase();
        for (const correctAnswer of q.answer){
          if (answer === correctAnswer.toLowerCase()){
            score++;
            messageUser(q.congratulate);
            gotIt = true;
          }
        }
        tries--;
      }
      let listAnswers = '';
      if (tries === 0){
        for (const answers of q.answer) { listAnswers += answers + ' '; }
        messageUser('Sorry the correct answers were: ' + listAnswers + ' better luck next time!');
      }
      break;
    }
    default:
      break;
    }
  }
}

function promptUser(question){
  let promptResponse = (prompt(question));
  return promptResponse;
}

function sanitizeInput(inputValue, inputType) {
  if (inputType === 'str'){
    if (inputValue === null){
      inputValue = '';
    }
    inputValue = inputValue.toLowerCase();
    if (inputValue === 'y'){
      inputValue = 'yes';
    } else if (inputValue === 'n') {
      inputValue = 'no';
    }
    return inputValue;
  }
}

function kickOff() {
  let userName = getUserName();
  messageUser('Hey ' + userName + ' welcome to my site!');

  if (userName !== 'cc'){
    askGenericQuestions(bioQuestions);
  }

  if (userName !== 'cc'){
    messageUser('Thanks for playing ' + userName + ' you scored ' + score + '/' + bioQuestions.length + '!');
  } else {
    messageUser('Cheaters never win!');
  }
}

function getUserName() {
  let userName = prompt('What is your name?');
  return userName;
}

function messageUser(msg) {
  alert(msg);
}

kickOff();
