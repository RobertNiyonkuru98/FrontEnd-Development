const click = document.getElementById("click");
const answer = document.getElementById("name");

// function interaction() {
//   const myName = document.getElementById("username").addEventListener("click", () => interaction);
//   answer.innerHTML = "My name is " + myName + "wassup";
// }

click.addEventListener("click", function () {
  const name = document.getElementById("username").value;
  answer.innerHTML = `You clicked me ${name}!`;
});

$(document).ready(function () {
  $("#click").click(function () {
    let age = $("#age").val();
    age = parseInt(age);

    if (age < 18) {
      $("#message").text("You are too young.").css("color", "red");
    } else {
      $("#message").text("Access granted.").css("color", "green");
    }
  });
});

const number = 12;
function myFunction(a) {
  console.log(a);
}

myFunction(number);
