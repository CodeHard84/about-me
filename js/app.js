'use strict';

// Start Lab 03 refactor
// Going to use an array for all of my list and my questions.
// Going to make this code look better, no more bleeding eyes.

// Array with my 5 questions and answers
// Modeled the array after: https://stackoverflow.com/questions/40601896/how-to-get-the-value-from-an-array-which-has-key-value-pair-objects
// Took awhile to find because I didn't know how to phrase the question.
const bioQuestions = [
  // q = question
  // a = answer
  // c = congratulate
  // g = give answer
  {
    q: 'Is my favorite color orange?',
    a: 'yes',
    c: 'My favorite color is orange! Good Job!',
    g: 'No, my favorite color is orange!'
  },
  {
    q: 'Do I have any experience in JavaScript?',
    a: 'no',
    c: 'Awesome! I really am new to JavaScript!',
    g: 'I didn\'t know a lick of JavaScript until I started classes.'
  },
  {
    q: 'Do I want to become a developer?',
    a: 'yes',
    c: 'Yep! I want to write amazing software!',
    g: 'No, I really do want to become a great developer!'
  },
  {
    q: 'Is my family my rock?',
    a: 'yes',
    c: 'You\'re right! My family is absolutely my rock.',
    g: 'No, my family is my world.'
  },
  {
    q: 'Do I like games?',
    a: 'yes',
    c: 'I love games, from board games to xbox!',
    g: 'Who doesn\'t like games! I know I sure do! =)'
  }
];

// Okay, now I am going to make a function that ask questions. Trying to stay DRY.
// Okay, now I am going to make a function that ask questions. Trying to stay DRY.
function askYesOrNoQuestions(questions){
  for (const q of questions) {
    let answer = askQuestion(q.q);
    // There has to be a better way for this.... Let me know.
    // Make sure the user answers yes/no or y/n
    while (answer === '' || answer === null || answer !== 'yes' && answer !== 'no'){
      answer = askQuestion(q.q + ' Valid input: yes/no or y/n');
    }
    // We have our answer, now let's just compare it to q.a answer
    if (answer === q.a) {
      messageUser(q.c);
    } else {
      messageUser(q.g);
    }
    // This is working q is the array and the .q is the question in the array.
    // console.log(q.q);
  }
}

// Ok, now I am going to create a function called kickoff which will start all my other
// functions.
function kickOff() {
  // Let's get the userName and greet them!
  let userName = getUserName();
  messageUser('Hey ' + userName + ' welcome to my site!');

  // Let's ask the user questions...
  // Passing the function an array as an argument.
  // Decided to do it this way in case we want more than
  // one array of questions. Going to let user completely
  // bypass this if username is 'cc';
  if (userName !== 'cc'){
    askYesOrNoQuestions(bioQuestions);
  }
  // Any other functions can be added here to make sure
  // they are executed when the page is loading.

  // Final message
  if (userName !== 'cc'){
    messageUser('Thanks for playing ' + userName + '!');
  } else {
    messageUser('Cheaters never win!');
  }
}

// Will get invoked in kickoff
function getUserName() {
  let userName = prompt('What is your name?');
  return userName;
}

// Need to invoke outside of kickoff
function messageUser(msg) {
  // This might seem redundant now, but I am sure we will stop using alerts
  // and switch to some other form of messaging. When we do, I'll be ready!
  alert(msg);
}

function askQuestion(q) {
  let answer = prompt(q);
  // Let's squash the bug...
  // Essentially you can not call toLowerCase on a null value.
  // So this just changes the null value to an empty string.
  // Same effect as null - none of the side effects?
  // I am sure there is a better way but this works for now.
  // Also, why doesn't VSCode block comment huge walls of text
  // like this one? LOL =)
  if (answer === null){
    answer = '';
  }
  // Now we can go toLowerCase
  answer = answer.toLowerCase();
  // Sanitize the answer a bit.
  if (answer === 'y'){
    answer = 'yes';
  } else if (answer === 'n') {
    answer = 'no';
  }
  return answer;
}

// Let's kick this party off
kickOff();
