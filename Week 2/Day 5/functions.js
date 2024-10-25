"use strict";
const countCharacters = (string) => {
    const count = {};
    for (let character of string) {
        if (count.hasOwnProperty(character) === true) {
            ++count[character];
        }
        else {
            count[character] = 1;
        }
    }
    console.log(`The characters in your string and the number of times they are used is as follows:`);
    console.log(`${JSON.stringify(count)}`);
    return count;
};
const greeting = (name, age) => {
    const message = `Hello ${name}.Your age is ${age}`;
    return message;
};
const convertTemperature = (temperature, convertTo) => {
    if (convertTo.toUpperCase() === "C") {
        return `${temperature} F converted into Celsius is:${Math.round((temperature - 32) * 5 / 9 * 10) / 10} C`;
    }
    else {
        return `${temperature} C converted into Farenheit is:${Math.round((temperature * 9 / 5 + 32) * 10) / 10} F`;
    }
};
const updateProduct = (product, update) => {
    if ((typeof update === "undefined") ||
        (typeof update.name === "undefined" && typeof update.price === "undefined")) {
        return product;
    }
    else {
        const { name, price } = update;
        return Object.assign(Object.assign(Object.assign({}, product), (typeof name !== "undefined" && { name: name })), (typeof price !== "undefined" && { price: price }));
    }
};
countCharacters("Hello");
console.log(greeting('Ali', 40));
console.log(convertTemperature(102.5, 'C'));
let product = { name: `HTC`, price: 500 };
console.log(`${JSON.stringify(updateProduct(product, { price: 300 }))}`);
product = { name: `Samsung`, price: 1000 };
console.log(`${JSON.stringify(updateProduct(product, { name: 'Nokia', price: 300 }))}`);
console.log(`${JSON.stringify(updateProduct(product, { name: `Nokia` }))}`);
console.log(`${JSON.stringify(updateProduct(product, {}))}`);
console.log(`${JSON.stringify(updateProduct(product))}`);
