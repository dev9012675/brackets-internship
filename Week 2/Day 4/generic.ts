import { Student , FilterObjects , Grade } from "./interface";

function filterBy<T>(arr:T[] , expression: (FilterObjects: T) => boolean):T[] {
    return arr.filter(expression)

}

let students : Student[] = []
let student:Student = {
    name: `Shafiq Ahmad` ,
    age: 23 ,
    scores: [65,71,83,84,87]   ,
    address: `Lahore`     ,
    grade: Grade.Freshman

}
students.push(student)

student = {
    name: `Ashfaq` ,
    age: 23 ,
    scores: [65,71,83,84,87]   ,
    address: `Gujranwala`     ,
    grade: Grade.Senior

}
students.push(student)

student = {
    name: `Jawad` ,
    age: 28 ,
    scores: [88 , 92 , 96 , 79 , 66]   ,
    address: `Lahore`     ,
    grade: Grade.Sophomore

}
students.push(student)

/*console.log(students)
 // Filter by age
console.log(filterBy<Student>(students , (s)=> s.age === 23))
 // Filter by address
console.log(filterBy<Student>(students , (s)=> s.address === `Lahore`))
*/
// Filter by age
console.log(filterBy<Student>(students , (s)=> s.grade === Grade.Sophomore))

