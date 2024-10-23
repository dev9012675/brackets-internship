"use strict";
function countCharacters(string) {
    let count = {};
    for (let character of string) {
        if (count.hasOwnProperty(character) === true) {
            ++count[character];
        }
        else {
            count[character] = 1;
        }
    }
    return count;
}
function greeting(name, age) {
    return `Hello ${name}.Your age is ${age}`;
}
const convertTemperature = (temperature, convertTo) => {
    if (convertTo.toUpperCase() === "C") {
        return Math.round((temperature - 32) * 5 / 9 * 10) / 10;
    }
    else {
        return Math.round((temperature * 9 / 5 + 32) * 10) / 10;
    }
};
console.log(countCharacters("Hello"));
console.log(greeting('Ali', 40));
console.log(convertTemperature(23.1, 'F'));
