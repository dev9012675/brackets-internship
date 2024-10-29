"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyEmergencyContact = exports.emptyStudentDetails = exports.emptyEducation = exports.emptyAddress = exports.emptyPersonalInfo = exports.ask = exports.rl = void 0;
const readline_1 = __importDefault(require("readline"));
exports.rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const ask = (msg) => new Promise((resolve) => exports.rl.question(msg, (response) => resolve(response)));
exports.ask = ask;
const emptyPersonalInfo = () => ({
    name: ``,
    age: 0,
    gender: ``,
    martial_status: ``,
    blood_group: ``,
});
exports.emptyPersonalInfo = emptyPersonalInfo;
const emptyAddress = () => ({
    country: ``,
    state: ``,
    city: ``,
    street: ``,
});
exports.emptyAddress = emptyAddress;
const emptyEducation = () => {
    const education = [];
    return education;
};
exports.emptyEducation = emptyEducation;
const emptyStudentDetails = () => ({
    major: ``,
    previousEducation: (0, exports.emptyEducation)(),
    department: ``,
});
exports.emptyStudentDetails = emptyStudentDetails;
const emptyEmergencyContact = () => ({
    name: ``,
    relation: ``,
    phone: ``,
});
exports.emptyEmergencyContact = emptyEmergencyContact;
