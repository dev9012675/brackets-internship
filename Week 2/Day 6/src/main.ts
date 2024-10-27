import readline from 'readline'
import { StudentManager } from './studentManager'
import { rl , ask } from './interfaces'


const main = async ():Promise<void> => {

    const manager = new StudentManager()
    
    console.log("Welcome to this Student Records Manager")
    let tempName:string
    let choice:number =  -1
    while(true) {
        console.log("Here are your options")
        console.log("1: Enter a new student.")
        console.log("2: View a complete list of the currently stored students.")
        console.log("3: View the data of a single student.")
        console.log("4: Update data of an existing student.")
        console.log("5: Save current data.")
        console.log("6: Load previous data.")
        console.log("7: Delete a student.")
        console.log("8: Quit program.")

        do {
            choice = parseInt(await ask(`Enter your choice:`))
           }while(isNaN(choice) || !(choice >=1 && choice <=8))
        
        switch(choice) {
            case 1:
                await manager.addMenu()
                break

            case 2:
                manager.displayPersonalInfo()
                break
            
            case 3:
                 tempName =  (await ask(`Enter name of student:`)).toLowerCase()
                if(manager.hasStudent(tempName) === true){
                    await manager.viewSingleStudentData(tempName)
                }
                else{
                    console.log(`Student not found`)
                }
                break

            case 4:
                 tempName =  (await ask(`Enter name of student:`)).toLowerCase()
                if(manager.hasStudent(tempName) === true){
                    await manager.updateStudent(tempName)
                }
                else{
                    console.log(`Student not found`)
                }
                break

            case 5:
                await manager.saveData()
                break

            case 6:
                await manager.fetchData()
                break

            case 7:
                tempName =  (await ask(`Enter name of student:`)).toLowerCase()
                if(manager.hasStudent(tempName) === true){
                    manager.deleteStudent(tempName)
                }
                else{
                    console.log(`Student not found`)
                }
                break

            case 8:
                console.log("Thank you for using this program.")
                rl.close()
                return

        }
    }
  
    
    
    


}

main()