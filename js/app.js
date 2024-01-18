'use strict';

// Track the correct answers
let score = 0;

// Modeled the array after: https://stackoverflow.com/questions/40601896/how-to-get-the-value-from-an-array-which-has-key-value-pair-objects
const bioQuestions = [
  // quetion = question
  // answer = answer
  // congratulate = congratulate
  // giveAnswer = give answer
  // questionType = type YN, INT, TF, etc..
  // allowedAttempts = How many tries?
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
    answer: Math.floor(Math.random() * (10 - 1 + 1) + 1), // Added random during code review/pair programming lab04.
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
    case 'YN': // Yes or no questions.
      answer = sanitizeInput(promptUser(q.question), 'str');
      // Now we popped the question, let's check the input.
      while (answer === '' || answer === null || answer !== 'yes' && answer !== 'no'){
        answer = sanitizeInput(promptUser(q.question + ' Valid input: yes/no or y/n'), 'str');
      }
      // Check answer
      if (answer === q.answer) {
        score++;
        messageUser(q.congratulate); // They got it!
      } else {
        messageUser(q.giveAnswer); // They didn't get it.
        // We could ask again here, but no need for now.
      }
      break;
    case 'TF': // True or false questions.
      answer = promptUser(q.question);
      break;
    case 'INT': { // Questions expecting an integer back.
      // Think I remember something about prompt only returning a string.... and I was right.
      // parseInt: https://www.sololearn.com/en/Discuss/2952070/javascript-user-input-solved
      // isInteger: https://www.tutorialspoint.com/How-to-check-if-a-variable-is-an-integer-in-JavaScript
      let tracker = 0;
      // Learned a new rule here: https://eslint.org/docs/latest/rules/no-case-declarations
      while(tracker <= q.allowedAttempts - 1) { // Account for starting at 0. Better way for this?
        answer = parseInt(promptUser(q.question));
        // Check the answer
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
            // We could credit the user another try here by using tracker--, but that's not part of lab03.
            messageUser('Try to use a number between 1-10');
          }
        }
        tracker++;
      }
      break;
    }
    // Turns out the case was a great idea =)
    case 'MC': {
      let gotIt = false;
      let tries = q.allowedAttempts; // 6
      while (tries > 0 && gotIt !== true){
        // Pop the question
        answer = promptUser(q.question);
        if (answer === null){
          answer = '';
        }
        answer = answer.toLowerCase();
        // Iterate through the array and compare.
        for (const correctAnswer of q.answer){
          if (answer === correctAnswer.toLowerCase()){
            score++;
            messageUser(q.congratulate);
            gotIt = true; // I feel like this is hacky but I couldn't get out of this dang nested while loop.
          }
        }
        tries--;
      }
      let listAnswers = '';
      if (tries === 0){
        for (const answers of q.answer) { listAnswers += answers + ' '; } // Made this a one liner because it looks better.
        messageUser('Sorry the correct answers were: ' + listAnswers + ' better luck next time!');
      }
      break;
    }
    default: // Should never get here. EVER.
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
    // Make sure we are not calling toLowerCase on a null type.
    if (inputValue === null){
      inputValue = '';
    }
    // Ok answer can't be null so let's go ahead and call toLowerCase.
    inputValue = inputValue.toLowerCase();
    // Sanitize the answer a bit.
    if (inputValue === 'y'){
      inputValue = 'yes';
    } else if (inputValue === 'n') {
      inputValue = 'no';
    }
    return inputValue;
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
    askGenericQuestions(bioQuestions);
  }
  // Any other functions can be added here to make sure
  // they are executed when the page is loading.

  // Final message
  if (userName !== 'cc'){
    messageUser('Thanks for playing ' + userName + ' you scored ' + score + '/' + bioQuestions.length + '!');
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

// Let's kick this party off
kickOff();
