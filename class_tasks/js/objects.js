let car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,

  start: function () {
    return this.brand + " is starting...";
  },
};

console.log(car.brand);
console.log(car.start());

let student = {
  name: "Alice",
  age: 22,
  course: "Frontend Dev",
};

student.age = 23;
student.grade = "A";
console.log(student);

function changeTitle() {
  let element = document.getElementById("title");

  element.innerText = "Welcome to FrontEnd Class!";
}

function styleOutput() {
  let element = document.getElementById("title1");

  element.innerText = "The styled text with Javascript!";
  element.style.color = "blue";
  element.style.fontSize = "20px";
}

let users = [
  { name: "Tony", age: 20 },
  { name: "Robert", age: 21 },
  { name: "Mitali", age: 22 },
  { name: "Niyonkuru", age: 23 },
];

function displayUsers() {
  let members = document.querySelector("#users");
  members.innerHTML = "";

  users.forEach((person, index) => {
    members.innerHTML += `<div>${index + 1}, ${person.name} : ${
      person.age
    } years old.</div>`;
  });
}

function signUp() {
  let form = document.querySelector("#input");
  form.innerHTML = "";

  form.innerHTML += `<label for="name">Names</label><br><br>
  <input type="text" id="username" placeholder="Enter your name"><br><br>
  <label for="email">Email</label><br><br>
  <input type="text" id="email" placeholder="Enter Your Email"><br><br>
  <label for="password">Password</label><br><br>
  <input type="password" id="pwd" placeholder="Enter your password"><br><br>
  <button type="button" id="submit" placeholder="Submit">Submit</button><br><br> `;
}

function showProfile() {
  let profile = document.getElementById("username").value;
  let person = [{ name: `${profile}` }];
  let logUser = document.getElementById("logUser");
  logUser.innerHTML = "";
  logUser.innerHTML += `<p> ${person.name}</p>`;
}

document.getElementById("output").addEventListener("click", changeTitle);
document.getElementById("styleBtn").addEventListener("click", styleOutput);
document.getElementById("showUsers").addEventListener("click", displayUsers);
document.getElementById("signUp").addEventListener("click", signUp);
document.getElementById("showProfile").addEventListener("click", showProfile);
