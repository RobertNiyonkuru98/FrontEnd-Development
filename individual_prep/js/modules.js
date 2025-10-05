/* ES6 MODULES */

export default class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

export function printName(user) {
  console.log(`User's name is ${user.age}`);
}

export function printAge(user) {
  console.log(`User is ${user.age} years old`);
}

export class Car {
  constructor(brand, color, year) {
    this.brand = brand;
    this.color = color;
    this.year = year;
  }
}

export function printBrand(car) {
  console.log(`Brand: ${car.brand}`);
}

export function printColor(car) {
  console.log(`Color: ${car.color}`);
}

export function printYear(car) {
  console.log(`Year: ${car.year}`);
}
