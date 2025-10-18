// Test
/*console.log("Test");*/

// Modules
// Require

/*
const tutorial = require("./tutorial.js");
console.log(tutorial);
console.log(tutorial.sum(1, 1));
console.log(tutorial.PI);
console.log(new tutorial.SomeMathObject());
*/

/* The Events Module and EventEmitter Class */

// EventEmitter => require(events)       // Dot emit(Listener argument)
// Dot on(Listener argument, function)

/*
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("tutorial", () => {
  console.log("tutorial event has occured");
});

eventEmitter.emit("tutorial");
*/

/*
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

// Now with parameters

eventEmitter.on("tutorial", (num1, num2) => {
  console.log(num1 + num2);
});

eventEmitter.emit("tutorial", 1, 2);

// Extending the emitter using Class
class Person extends EventEmitter {
  constructor(name) {
    super();
    this._name = name;
  }

  get name() {
    return this._name;
  }
}

let pedro = new Person("Pedro");
pedro.on("name", () => {
  console.log(`my name is ${pedro.name}`);
});

pedro.emit("name");

//we have more than one person

let christina = new Person("Christina");
christina.on("name", () => {
  console.log(`My name is ${christina.name}`);
});

christina.emit("name");
*/

/* Working with the READLINE MODULE */

// readline => require(readline)
// Dot createInterface(properties => input: process.stdin, output: process.stdout)

/*
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let num1 = Math.floor(Math.random() * 10 + 1);
let num2 = Math.floor(Math.random() * 10 + 1);
let answer = num1 + num2;

// Dot question(Argument, Function)
// Dot close => ends the execution of the code after the input is complete.

rl.question(`What is ${num1} + ${num2}? \n`, (userInput) => {
  if (userInput.trim() == answer) {
    rl.close();
  } else {
    rl.setPrompt("Incorrect response, Try again \n");
    rl.prompt();

    // loop until the answer is true
    rl.on("line", (userInput) => {
      if (userInput.trim() == answer) {
        rl.close();
      } else {
        rl.setPrompt(`Your answer of ${userInput} is incorrect \n Try again`);
        rl.prompt();
      }
    });
  }
});

// Dot on to connect it to the eventEmitter

rl.on("close", () => {
  console.log("Correct!!!!");
});
*/

/* Working with File System Module */
// fs => require(fs)

const fs = require("fs");
//creating a file
// Dot writeFile(File name, Content, error callback function)

//reading a file
// Dot readFile(File name, encodding, error callback function)

/*
fs.writeFile("example.txt", "This is an example", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("File successfully created");
    fs.readFile("example.txt", "utf-8", (err, file) => {
      if (err) {
        console.log(err);
      } else {
        console.log(file);
      }
    });
  }
});

*/

/*
// Renaming the file
// Dot rename(file, filenewname, error callback function)
fs.rename("example.txt", "example2.txt", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully renamed the file");
  }
});
*/

/*
// Adding more content to the file
// Dot append(file, data to append, error callback function)
fs.appendFile("example2.txt", "Yolla", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully appended data to the file");
  }
});
*/

/*
// Deleting the file
// Dot unlink(File,Error callback function)
fs.unlink("example2.txt", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully deleted the file");
  }
});
*/
