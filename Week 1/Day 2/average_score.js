const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const ask = (msg) => new Promise(resolve => 
    rl.question(msg, response => resolve(response))
  );

const main = async () => {
    let num = average = null
    let data = {}
    let sum = 0
    do {
     num = await ask(`Enter no of students:`)
    }while(isNaN(num) || num < 1)
    for(let i = 0; i < num ; i++)
    {
        let studentName = score = null
        studentName = await ask("Enter name of student:")
        do {
            score = await ask(`Enter score:`)
           }while(isNaN(score) || !(score >=0 && score <= 100 ))
        score = parseInt(score)
        sum += score
        data[studentName] = score
    }
    console.log("The student names along with their scores are:" , data)
    console.log("The average score is:" , (sum/num))
    rl.close() 
  }

  main()