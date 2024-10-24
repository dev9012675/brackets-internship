"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interface_1 = require("./interface");
function filterBy(arr, expression) {
    return arr.filter(expression);
}
let students = [];
let student = {
    name: `Shafiq Ahmad`,
    age: 23,
    scores: [65, 71, 83, 84, 87],
    address: `Lahore`,
    grade: interface_1.Grade.Freshman
};
students.push(student);
student = {
    name: `Ashfaq`,
    age: 23,
    scores: [65, 71, 83, 84, 87],
    address: `Gujranwala`,
    grade: interface_1.Grade.Senior
};
students.push(student);
student = {
    name: `Jawad`,
    age: 28,
    scores: [88, 92, 96, 79, 66],
    address: `Lahore`,
    grade: interface_1.Grade.Sophomore
};
students.push(student);
/*console.log(students)
 // Filter by age
console.log(filterBy<Student>(students , (s)=> s.age === 23))
 // Filter by address
console.log(filterBy<Student>(students , (s)=> s.address === `Lahore`))
*/
// Filter by age
console.log(filterBy(students, (s) => s.grade === interface_1.Grade.Sophomore));
