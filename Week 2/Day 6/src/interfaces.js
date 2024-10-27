"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ask = exports.rl = void 0;
const readline_1 = __importDefault(require("readline"));
exports.rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const ask = (msg) => new Promise(resolve => exports.rl.question(msg, (response) => resolve(response)));
exports.ask = ask;
