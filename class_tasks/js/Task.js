let socialMedia = [
  { name: "Robert" },
  { name: "Micheal" },
  { name: "Teniola" },
];

function members() {
  console.log("Active people on Social media");
  socialMedia.forEach((person, index) => {
    console.log(`${index}. Name: ${person.name}`);
  });
}

function removePerson(name) {
  const index = socialMedia.findIndex((person) => person.name === name);
  if (index !== -1) {
    socialMedia.splice(index, 1);
    console.log(`${name} has been removed from the social media list.`);
  } else {
    console.log(`${name} was not found.`);
  }
}

function addperson(name) {
  socialMedia.push({ name });
  console.log(`${name} has been added to the social media list.`);
}

members();
removePerson("Robert");
members();
addperson("Tony");
members();
