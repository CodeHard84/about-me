'use strict';

// I know a refactor is coming but using only the concepts we learned so far is making my
// eyes bleed. I know there is a better way to do this and can't wait to learn it!

// Get the user's name..
function getUserName() {
  let userName = prompt('What is your name?');
  return userName;
}

let userName = getUserName();

alert('Hey ' + userName + ' welcome to my site!');

// NOTES: Well I initially thought a case expression would allow for the || operator and I
// was wrong. So this looks terrible but it works to the guidelines of the project. I used
// a if to sanitize the input because multiple cases to check for yes or y seemed redundant.

let myFavoriteColor = prompt('Is my favorite color orange? Input: y/n or yes/no').toLowerCase();
if (myFavoriteColor === 'y') {
  myFavoriteColor = 'yes';
}
switch (myFavoriteColor) {
case 'yes':
  // console.log('You got it!');
  alert('You got it!');
  break;
default:
  // console.log('No my favorite color is orange!');
  alert('No my favorite color is orange!');
}

let myCodingExperience = prompt('Do I have any experience in JavaScript? Input: y/n or yes/no').toLowerCase();
if (myCodingExperience === 'y') {
  myCodingExperience = 'yes';
}
switch (myCodingExperience) {
case 'yes':
  // console.log('No, I don\'t have any JavaScript experience.');
  alert('No, I don\'t have any JavaScript experience.');
  break;
default:
  alert('You got it!');
  // console.log('You got it!');
}

let myGoals = prompt('Do I want to become a developer? Input: y/n or yes/no').toLowerCase();
if (myGoals === 'y') {
  myGoals = 'yes';
}
switch (myGoals) {
case 'yes':
  alert('You got it!');
  // console.log('You got it!');
  break;
default:
  // console.log('I REALLY do want to be a developer!');
  alert('I REALLY do want to be a developer!');
}

let myFamily = prompt('Is my family my rock? Input: y/n or yes/no').toLowerCase();
if (myFamily === 'y') {
  myFamily = 'yes';
}
switch (myFamily) {
case 'yes':
  // console.log('You got it!');
  alert('You got it!');
  break;
default:
  // console.log('My family is absolutely my rock!');
  alert('My family is absolutely my rock!');
}

let myHobby = prompt('Do I like games? Input: y/n or yes/no').toLowerCase();
if (myHobby === 'y') {
  myHobby = 'yes';
}
switch (myHobby) {
case 'yes':
  alert('You got it!');
  // console.log('You got it!');
  break;
default:
  // console.log('I love games!');
  alert('I love games!');
}

// Final message
alert('Cya, later ' + userName);
