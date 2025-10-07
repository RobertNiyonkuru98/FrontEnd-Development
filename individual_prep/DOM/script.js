/* DOM MANIPULATION */
// Selecting an element from the document
/*
const body = document.body;
// body.append("Hello World", "Bye");

const div = document.createElement("div");
// div.innerText = "Hello World";
div.textContent = "Hello Worlds";
body.append(div);
*/

// SELECTING TAGS IN THE HTML

/*
const div = document.querySelector("div");
console.log(div.textContent); // Displays what we actually have in the code
console.log(div.innerText); // Displays whats visible
*/

// ADDING HTML TAGS IN THE DOM using JS
/*
const body = document.body;
const div = document.createElement("div");
const strong = document.createElement("strong");
strong.innerText = "Hello Wolrd";
div.textContent = "Hello World";
div.innerHTML = "<strong>Hey</strong>";
body.append("div");
*/

/* REMOVING ELEMENTS */
const body = document.body;
const div = document.querySelector("div");
const spanHi = document.querySelector("#hi");
const spanBye = document.querySelector("#bye");

spanBye.remove();
div.append(spanBye);

// div.removeChild(spanHi);
spanHi.remove();
div.append(spanHi);

/* ADDING CLASSES, STYLES*/

console.log(spanHi.getAttribute("title"));
console.log(spanBye.getAttribute("id"));

/* Classes */

spanHi.classList.add("new-class");
spanHi.classList.remove("hi1");
spanHi.classList.toggle("hi3", true);

/* Style modification */

spanHi.style.color = "red";
spanBye.style.backgroundColor = "blue";
