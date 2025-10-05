import User, {
  printName as printUserName,
  printAge,
  Car,
  printBrand,
  printColor,
  printYear,
} from "./modules.js";

const user = new User("Bob", 11);
console.log(user);
printUserName(user);
printAge(user);

const vehicle = new Car("Toyota", "Black", 2020);
console.log(vehicle);
printBrand(vehicle);
printColor(vehicle);
printYear(vehicle);
