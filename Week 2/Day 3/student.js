"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StudentManager {
    constructor() {
        this._students = [];
    }
    // Add a student
    add(name, age, scores, address) {
        const s1 = {
            name: name,
            age: age,
            scores: scores,
            address: address
        };
        this._students.push(s1);
    }
    // Get a single student object using student name
    getStudent(name) {
        for (let student of this._students) {
            if (student.name === name) {
                return student;
            }
        }
        return null;
    }
    // Get the whole students array
    get students() {
        return this._students;
    }
    // Display students using console.log()
    displayStudents() {
        if (this._students.length === 0) {
            console.log(`No students currently present in system`);
        }
        else {
            for (let student of this._students) {
                console.log('{');
                console.log(`Name:${student.name}`);
                console.log(`Age:${student.age}`);
                console.log(`Address:${student.address}`);
                console.log(`Scores:[${student.scores}]`);
                console.log(`}`);
            }
        }
    }
}
const manager = new StudentManager();
manager.displayStudents();
manager.add('Shafiq Ahmad', 23, [65, 71, 83, 84, 87], `Lahore`);
manager.add('Ashfaq Shoukat', 27, [88, 92, 96, 79, 66], `Gujranwala`);
manager.displayStudents();
console.log(manager.getStudent('Ashfaq Shoukat'));
console.log(manager.students);
