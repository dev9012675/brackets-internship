

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
}) 

const ask = (msg) => new Promise(resolve => 
    rl.question(msg, response => resolve(response))
  );

  const fs = require('fs').promises;

const studentManager =(()=> {
    let studentData = [] , highest =  lowest = null

    const number = (()=> {
        let students = 0;
        const setStudents = (value)=> {
           students = value
        }
   
        const increment = ()=> {
           students += 1
        }
   
        const getStudents = ()=> {
           return students
        }
   
        return {
           setStudents:setStudents , increment:increment , getStudents:getStudents
        }
   
      }
   )()
    const add = async () => {
        let studentName = score = numScores = maximum = minimum = null
        let scores = []
        let i = sumScores = 0

        do {
            studentName = await ask(`Enter name of student:`)

           }while(studentName.length === 0)
        
      
        
        
        while ( i < 5)
        {
            do {
                score = parseInt(await ask(`Enter score ${i+1}:`))
            }while(isNaN(score) || !(score >=0 && score <= 100 ))

            scores.push(score)
            
            if( maximum === null || score > maximum) {
                maximum = score
            }

            if(minimum === null || score < minimum)
            {
                minimum = score
            }
        
            sumScores += score
            ++i;
        }

        if(highest === null || sumScores > highest) {
            highest = sumScores
        }

        if(lowest === null || sumScores < lowest)
        {
            lowest = sumScores
        }
        studentData.push({name:studentName , scores:scores , average:sumScores/scores.length ,
             maximum: maximum , minimum: minimum , total:sumScores})
        
        number.increment()

        
    }

   const max = () => highest
   
   const min = () => lowest


   const save = async()=> {
    try{
    
   
        const jsonContent = JSON.stringify({studentData:studentData , highest:highest , lowest:lowest});

        await fs.writeFile("./data.json", jsonContent, 'utf8');
        console.log("The file was saved!");
    } catch(err) {
        console.log(err)
    }
     
   }

    const fetchData = async () => {

  
        try {
            await fs.access(`data.json`, fs.constants.F_OK);
          } catch {
            console.log('No previous data');
            return
          }
        let obj;
        let data = await fs.readFile('data.json', 'utf8');
        obj = JSON.parse(data);
         
        studentData = obj["studentData"]
        
        highest = obj["highest"]
        lowest = obj["lowest"]
        number.setStudents(studentData.length)
        console.log("Data loaded successfully")


   }
     

   const showStudents = ()=> {
     
     for(let student of studentData) {
        console.log(`{`)
        console.log(`Name:${student.name}`)
        console.log(`Average:${student.average}`)
        console.log(`Maximum:${student.maximum}`)
        console.log(`Minimum:${student.minimum}`)
        console.log(`Scores:${student.scores} `)
        console.log(`Total:${student.total} `)
        console.log(`}`)

    
     }

   }

  



  
   
     
    return {
         add:add , max:max , min:min , showStudents:showStudents  , 
         save:save , fetchData:fetchData ,  number:number
    }

})()

const main = async ()=> {
    console.log("Welcome to this Student Records Manager")
    let choice =  null
    while(true) {
        console.log("Here are your options")
        console.log("1: Enter a new student.")
        console.log("2: View a complete list of the currently stored students.")
        console.log("3: View the maximum current score.")
        console.log("4: View the minimum current score.")
        console.log("5: Save current data.")
        console.log("6: Load previous data.")
        console.log("7: View number of students.")
        console.log("8: Quit program.")
        do {
            choice = parseInt(await ask(`Enter your choice:`))
           }while(isNaN(choice) || !(choice >=1 && choice <=8))
        
        switch(choice) {
            case 1:
                await studentManager.add()
                await ask("Press enter to continue:")
                break;
            
            case 2:
                studentManager.number.getStudents() === 0 ? console.log("No students currently available in system") 
                : studentManager.showStudents()
                await ask("Press enter to continue:")
                break
            
            case 3:
                studentManager.number.getStudents() === 0 ? console.log("No students currently available in system") 
                : console.log(`The maximum current score is:${studentManager.max()}`)
                await ask("Press enter to continue:")
                break
            
            case 4:
                studentManager.number.getStudents() === 0 ? console.log("No students currently available in system") 
                : console.log(`The minimum current score is:${studentManager.min()}`)
                await ask("Press enter to continue:")  
                break


            case 5:
                await studentManager.save()
                await ask("Press enter to continue:")
                break

            case 6:
                await studentManager.fetchData()
                await ask("Press enter to continue:")
                break

            case 7:
                studentManager.number.getStudents() === 0 ? console.log("No students currently available in system") 
                : console.log(`The number of students currently available in the system is:${studentManager.number.getStudents()}`)
                await ask("Press enter to continue:")  
                break
            case 8:
                console.log("Thank you for using this program.")
                rl.close()
                return
                
        }

        
    }


   
}

main()








