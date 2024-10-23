"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const calculator = (a, b, operator) => {
    switch (operator) {
        case `+`:
            return a + b;
        case `-`:
            return a - b;
        case `*`:
            return a * b;
        case `/`:
            return a / b;
    }
};
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const ask = (msg) => new Promise(resolve => rl.question(msg, (response) => resolve(response)));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let num1 = ``;
    let num2 = ``;
    let operator = ``;
    do {
        num1 = yield ask("Enter first number:");
    } while (isNaN(parseFloat(num1)));
    do {
        num2 = yield ask("Enter second number:");
    } while (isNaN(parseFloat(num2)));
    do {
        operator = yield ask("Enter operator:");
    } while (!(operator === `+` || operator === `-` || operator === `/` || operator === `*`));
    console.log(`The result of the operation is:${calculator(parseFloat(num1), parseFloat(num2), operator)}`);
    rl.close();
});
main();
