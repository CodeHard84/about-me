'use strict';

// Track the correct answers
let score = 0;

// Modeled the array after: https://stackoverflow.com/questions/40601896/how-to-get-the-value-from-an-array-which-has-key-value-pair-objects
const bioQuestions = [
  // q = question
  // a = answer
  // c = congratulate
  // g = give answer
  // t = type YN, INT, TF, etc..
  // s = How many tries?
  {
    q: 'Is my favorite color orange?',
    a: 'yes',
    c: 'My favorite color is orange! Good Job!',
    g: 'No, my favorite color is orange!',
    t: 'YN'
  },
  {
    q: 'Do I have any experience in JavaScript?',
    a: 'no',
    c: 'Awesome! I really am new to JavaScript!',
    g: 'I didn\'t know a lick of JavaScript until I started classes.',
    t: 'YN'
  },
  {
    q: 'Do I want to become a developer?',
    a: 'yes',
    c: 'Yep! I want to write amazing software!',
    g: 'No, I really do want to become a great developer!',
    t: 'YN'
  },
  {
    q: 'Is my family my rock?',
    a: 'yes',
    c: 'You\'re right! My family is absolutely my rock.',
    g: 'No, my family is my world.',
    t: 'YN'
  },
  {
    q: 'Do I like games?',
    a: 'yes',
    c: 'I love games, from board games to xbox!',
    g: 'Who doesn\'t like games! I know I sure do! =)',
    t: 'YN'
  },
  {
    q: 'I am thinking of a number between 1-10, what is it?',
    a: Math.floor(Math.random() * (10 - 1 + 1) + 1), // Added random during code review/pair programming lab04.
    t: 'INT',
    s: 4
  },
  {
    q: 'What is one of my FAVORITE movies?',
    a: ['Demolition Man', 'Judge Dredd', 'Dredd', 'Total Recall', 'Moon',
      'The Fifth Element', '47 Ronin', 'Lord of the Rings', 'The Hobbit', 'Con Air'],
    c: 'You nailed it! Congrats!',
    t: 'MC',
    s: 6
  }
];

function askGenericQuestions(questions) {
  for (const q of questions) {
    let answer;
    switch (q.t) {
    case 'YN': // Yes or no questions.
      answer = sanitizeInput(promptUser(q.q), 'str');
      // Now we popped the question, let's check the input.
      while (answer === '' || answer === null || answer !== 'yes' && answer !== 'no'){
        answer = sanitizeInput(promptUser(q.q + ' Valid input: yes/no or y/n'), 'str');
      }
      // Check answer
      if (answer === q.a) {
        score++;
        messageUser(q.c); // They got it!
      } else {
        messageUser(q.g); // They didn't get it.
        // We could ask again here, but no need for now.
      }
      break;
    case 'TF': // True or false questions.
      answer = promptUser(q.q);
      break;
    case 'INT': { // Questions expecting an integer back.
      // Think I remember something about prompt only returning a string.... and I was right.
      // parseInt: https://www.sololearn.com/en/Discuss/2952070/javascript-user-input-solved
      // isInteger: https://www.tutorialspoint.com/How-to-check-if-a-variable-is-an-integer-in-JavaScript
      let tracker = 0;
      // Learned a new rule here: https://eslint.org/docs/latest/rules/no-case-declarations
      while(tracker <= q.s - 1) { // Account for starting at 0. Better way for this?
        answer = parseInt(promptUser(q.q));
        // Check the answer
        if(answer === q.a) {
          score++;
          messageUser('You got the number in ' +(tracker + 1)+ ' tries!');
          break;
        } else if (tracker >= q.s - 1){
          messageUser('Sorry you didn\'t get it! The number was ' + q.a );
          break;
        } else {
          if (answer > q.a){
            messageUser('My number is less than ' +answer+ '.');
          }
          if (answer < q.a){
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
      let tries = q.s; // 6
      while (tries > 0 && gotIt !== true){
        // Pop the question
        answer = promptUser(q.q);
        if (answer === null){
          answer = '';
        }
        answer = answer.toLowerCase();
        // Iterate through the array and compare.
        for (const correctAnswer of q.a){
          if (answer === correctAnswer.toLowerCase()){
            score++;
            messageUser(q.c);
            gotIt = true; // I feel like this is hacky but I couldn't get out of this dang nested while loop.
          }
        }
        tries--;
      }
      let listAnswers = '';
      if (tries === 0){
        for (const answers of q.a) { listAnswers += answers + ' '; } // Made this a one liner because it looks better.
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
  // Parse
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
