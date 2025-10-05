/*
console.log("Hello World!");
console.log("Test");
*/

/*Variables */

//let  //const(no reassignment)
//var

/*
var variableName = "Welcome to Variables";
const variableNom = "CANNOT BE REASSIGNED";
const name = "john";
const _nom = "Johnny";
const $alias = "Johnboy";
let person = "Tony";
console.log(variableName);
console.log(variableNom);
console.log(_nom);
console.log($alias);
console.log(name);
console.log(person);

*/

/*Data Types*/

//Strings  //Booleans  //Undefined  //Symbol
//Numbers  //Null      //Object

// String

/*
const exampleString = "How are you doing";
const singleQuotes = "This is a single quoted string";
const doubleQuotes = "This is a double quoted string";
const backticks = `This is backtick quoted string`;
const name = "Jane";
const nameTicks = `Hello ${name}, welcome!`;
const numberTicks = `2 + 2 = ${2 + 2}`;
console.log(typeof numberTicks);
console.log(numberTicks);
console.log(nameTicks);
console.log(backticks);
console.log(doubleQuotes);
console.log(singleQuotes);
console.log(exampleString);
console.log("Hello world");

*/

// Numbers

/*
const wholeNumber = 5;
const decimalNumber = 0.5;
const firstNumber = 5;
const secondNumber = 10;
const add = firstNumber + secondNumber;
const minus = firstNumber - secondNumber;
const multiply = firstNumber * secondNumber;
const divide = firstNumber / secondNumber;
console.log(typeof wholeNumber);
console.log(add);
console.log(minus);
console.log(multiply);
console.log(divide);
console.log(wholeNumber);
console.log(decimalNumber);

*/

// Booleans

/*
const isCool = true;
const age = 20;
console.log(age > 20);
console.log(typeof isCool);
console.log(isCool);

if (isCool) {
  console.log("Yo man, you're cool");
} else {
  console.log("Oh, Hi");
}

*/

// NULL

/*
const age = null;
let year = null;
year = 20;
console.log(age);
console.log(year);

*/

// UNDEFINED

/*
let x;
console.log(x);

*/

// OBJECTS

/*
const name = "John";
const age = 25;
const person = {
  name: "John",
  age: 25,
};

console.log(person);
*/

// Dot notation

/*console.log(person.name);*/

// Array

/*
const arr = [1, 2, 3, 4];
const date = new Date();
console.log(date);
console.log(arr);

*/

// Statically typed (C)
// Dynamically typed (JS)

/*
let message = "Hello worlds";
message = 5;
console.log(message);

*/

// Operators
// Comparison Operators => true/false

/*
const a = 5;
const b = 10;
console.log(a > b);
console.log(a < b);
console.log(a == b);
console.log(a >= b);
console.log(a <= b);
console.log(a != b);

*/

/*
console.log(5 == 5);
console.log("Hello" == "Hello");
console.log(5 == "5");
console.log(5 === "5");
*/

// Logical Operators

// OR   // NOT
// AND

// AND && (all operands are true)

/*
console.log(true && false);
console.log(true && true);
console.log(false && true);
console.log(false && false);
console.log(true && false && true);
console.log(true && true && true);
console.log(false && false && false);

*/

//OR || (at least one operand is true)

/*
console.log(true || false);
console.log(true || true);
console.log(false || true);
console.log(false || false);

*/

// NOT !

/*
console.log(!false);
*/

/* DECISION MAKING IN CODE */

// IF STATEMENTS        // SWITCH STATEMENTS
// TRUTH/FALSY VALUES   // TERNARY OPERATORS

/*
const age = 18;

if (age > 18) {
  console.log("You may enter");
} else if (age === 18) {
  console.log("You just turned 18, Welcome");
} else {
  console.log("Cannot enter");
}

*/

// Truthy/falsy values

// while loop

/*
let i = 0;

while (i < 10) {
  console.log(i);
  i++;
}
*/

// for loop

/*for([initialization]; [condition]; [final-expression]) {

}*/

/*for (let i = 0; i < 10; i++) {
  console.log(i);
}
*/

/* FUNCTIONS */

/*
// A BLOCK OF CODE => PERFORMS A TASK
// FUNCTION DECLARATION
function square(number) {
  console.log("I'm here");
  return number * number;
}
// FUNCTION CALL
const result = square(5);
console.log(result);

*/

// MOre
// A function declaration
/*
function name(params){
  //statements
  //have access to "this" keyword
}
*/

// A function  expression

/*
const name = function(params){
  //statements
}
*/

// An arrow function

/*
const name = (params) => {
  //statements
}
*/

/*
function sayHi(name) {
  console.log(`Hi ${name}`);
}

sayHi("Joe");
*/

/*
function add(a, b) {
  return "RETURNED";
  return a + b;
}

const sum = add(2, 2);
console.log(sum);

function test() {
  return true;
  return false;
}

const bool = test();
console.log(bool);
*/

// ARROW FUNCTION

/*
const square = (number) => {
  return number * number;
};

const result = square(5);
console.log(result);

const add = (a, b) => a + b;
const answer = add(2, 6);
console.log(answer);
*/
