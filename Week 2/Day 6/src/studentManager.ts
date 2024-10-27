import readline from 'readline'

const fs = require('fs').promises;
import { PersonalInfo , Address , Education , StudentDetails , EmergencyContact ,Student , ask } from "./interfaces";

export class StudentManager {
    private students:any
    private cache:any 

    constructor() {
        this.students = {}
        this.cache = {}
    }

    public hasStudent(name:string){
          return this.students.hasOwnProperty(name)
    }

    public async setPersonalInfo(input:number):Promise<number|string> {
        let output:number|string = ``
        switch(input) {
            case 1:
                    output = await this.setGenericField(`name`)
                    break;
            
            case 2:
                do {
                    output = await ask(`Enter gender of student(M for Male, F for Female , O for Other):`)

                }while(!(output.toLowerCase() === `m` || output.toLowerCase() === `f`  || output.toLowerCase() === `o`))
                break;

            case 3:
                do {
                    output = await ask(`Enter martial status of student(S for Single, M for Married):`)

                }while(!(output.toLowerCase() === `s` || output.toLowerCase() === `m` ))
                break;

            case 4:
                do {
                    output = parseInt(await ask(`Enter age of Student:`))

                }while(isNaN(output) || !(output >= 0 && output  <= 100 ))
                break;

            case 5:
                do {
                    output = await ask(`Enter blood group of Student:`)
                }while(!( output === `A+`|| output === `A-`|| output === `B+`||
                    output === `B-`|| output === `O+`|| output === `O-`|| output === `AB+`||
                    output === `AB-`))

        }
        return typeof output === `number` ? output : output.toLowerCase()
    }

    public async setGenericField(input:string):Promise<string> {
        let output:string = ``
        do{
            output = await ask(`Enter ${input}:`)
        }while(output.length === 0)
        return output
    }

    public async setStudentInfo(input:number):Promise<PersonalInfo | Address | StudentDetails | EmergencyContact> {
        const info:any = {} 
        switch(input) {
            case 1:
                info["name"] = await this.setPersonalInfo(1)
                switch(await this.setPersonalInfo(2)){
                    case `m`:
                        info["gender"] = `Male`
                        break
                    case `f`:
                        info["gender"] = `Female`
                        break
                    case `o`:
                        info["gender"] = `Other`
        
                }
                info["martial_status"] = await this.setPersonalInfo(3) === `s` ? `Single` : `Married`
                info[`blood_group`] = await this.setPersonalInfo(5)
                info["age"] = await this.setPersonalInfo(4)
                break
            
            case 2:
                info["country"] = await this.setGenericField(`country`)
                info["state"] = await this.setGenericField(`state`)
                info["city"] = await this.setGenericField(`city`)
                info["street"] = await this.setGenericField(`street`)
                break

            case 3:
                let education:Education[] = []
                let data:any
                let flag:number
                do{
                    data = {}
                    data["degree"] = await this.setGenericField(`degree`)
                    data["institute"] = await this.setGenericField(`institute`)
                    education.push(data)
                    flag = parseInt(await ask(`If you have no more degrees, Enter 0,otherwise press any key to continue:`))
                    if(flag === 0)
                    {
                        break
                    }



                }while(true)
                info[`previousEducation`] = education
                info[`major`] = await this.setGenericField(`major`)
                info[`department`] = await this.setGenericField(`department`)
                break

            case 4:
                info["name"] = await this.setGenericField("Guardian Name")
                info["relation"] = await this.setGenericField("relation")
                info["phone"] = await this.setGenericField("Guardian Phone No.")

                
        }
        return info

       
    

    }

    public async addStudent(name?:string):Promise<void> {

        let choice:string = ``
        let progress:number = 1
        let info:any = {} , address:any = {} , details:any = {} ,
        emergencyInfo:any = {}
        let retrievedData:any = null
        
        if(typeof name === `string`) {
              retrievedData = this.cache[name]
              progress = retrievedData.progress
              
            if(progress === 2) {
                 info = retrievedData.data.info
            }
            else if(progress === 3) {
                info = retrievedData.data.info
                address = retrievedData.data.address
            }
            else if(progress === 4) {
                info = retrievedData.data.info
                address = retrievedData.data.address
                details = retrievedData.data.details
            }


        }
            
        
        
        while(true) {
            if(progress === 1) {
                info = await this.setStudentInfo(1)
                progress = 2
                choice = await ask(`If you want to quit and save your progress, press Q:`)
                if(choice.toLowerCase() === `q`) {
                    this.cacheProgress({info} , progress)
                    console.log(this.cache)
                    return
                }

            }
            else if(progress === 2) {
                address = await this.setStudentInfo(2)
                progress = 3
                choice = await ask(`If you want to quit and save your progress, press Q:`)
                if(choice.toLowerCase() === `q`) {
                    this.cacheProgress({info , address} , progress)
                    console.log(this.cache)
                    return
                }
            }
            else if(progress === 3) {
                details = await this.setStudentInfo(3)
                progress = 4
                choice = await ask(`If you want to quit and save your progress, press Q:`)
                if(choice.toLowerCase() === `q`) {
                    this.cacheProgress({info , address , details} , progress)
                    console.log(this.cache)
                    return
                }
            }
            else if(progress === 4) {
                emergencyInfo = await this.setStudentInfo(4)
                const student:Student = {
                    info:info ,
                    address:address ,
                    details:details ,
                    emergencyInfo:emergencyInfo
                }
                this.students[student.info.name] = student
                console.log(this.students)
                if(this.cache.hasOwnProperty(student.info.name)){
                    delete this.cache[student.info.name]
                }
                return
                
            }

        }
      
        


    }

    public async cacheProgress(data:any , progress:number):Promise<void> {
            this.cache[data.info.name] = {data , progress}
            return
    }

    public async addMenu():Promise<void> {
        let choice:number =  -1
        while(true) {
            console.log("Here are your options")
            console.log("1: Enter a new student from scratch.")
            console.log("2: Continue from where you left off previously.")
            console.log("3: Go back to previous form.")
    
            do {
                choice = parseInt(await ask(`Enter your choice:`))
               }while(isNaN(choice) || !(choice >=1 && choice <=3))
            
            switch(choice) {
                case 1:
                    await this.addStudent()
                    break

                case 2:
                    const tempName:string =  (await ask(`Enter name of student:`)).toLowerCase()
                    if(this.cache.hasOwnProperty(tempName) === true){
                        await this.addStudent(tempName)
                    }
                    else{
                        console.log(`Student not found`)
                    }
                    break
    
                case 3:
                    
                    return
    
            }

        }

    }

    public async viewSingleStudentData(name:string):Promise<void>{
        const data:any = this.students[name]
        let choice:number =  -1
        while(true) {
            console.log("Here are your options")
            console.log("1: View Personal Information of Student.")
            console.log("2: View Address of Student.")
            console.log("3: View Education Information about Student.")
            console.log("4: View Emergency contact Information of Student.")
            console.log("5: Return to previous menu.")
    
            do {
                choice = parseInt(await ask(`Enter your choice:`))
               }while(isNaN(choice) || !(choice >=1 && choice <=5))
            
                switch(choice) {
                    case 1:
                        console.table(data["info"])
                        break
    
                    case 2:
                        console.table(data["address"])
                        break
        
                    case 3:
                        console.table(data["details"])
                        break
                    
                    case 4:
                        console.table(data["emergencyInfo"])
                        break

                    case 5:
                        return
                    
        
                }

            
        }
    }

    public async updateStudent(name:string):Promise<void>{

        let data:any = this.students[name]
        let choice:number =  -1
        while(true) {
            console.log("Here are your options")
            console.log("1: Update Personal Information of Student.")
            console.log("2: Update Address of Student.")
            console.log("3: Update Education Information about Student.")
            console.log("4: Update Emergency contact Information of Student.")
            console.log("5: Return to previous menu.")
    
            do {
                choice = parseInt(await ask(`Enter your choice:`))
               }while(isNaN(choice) || !(choice >=1 && choice <=5))
            
                switch(choice) {
                    case 1:
                        data["info"] = await this.setStudentInfo(1)
                        delete this.students[name]
                        this.students[data.info.name] = data
                        return
    
                    case 2:
                        data["address"] = await this.setStudentInfo(2)
                        this.students[name] = data
                        break
        
                    case 3:
                        data["details"] = await this.setStudentInfo(3)
                        this.students[name] = data
                        break
                    
                    case 4:
                        data["emergencyInfo"] = await this.setStudentInfo(4)
                        this.students[name] = data
                        break

                    case 5:
                        return
                    
        
                }

            
        }

    }

    public displayPersonalInfo():void {
       Object.values<Student>(this.students).forEach((student)=> {
           console.table(student.info)
       })
    }

    public deleteStudent(name:string):void {
         delete this.students[name]
    }

    public async saveData():Promise<void> {
        try{
    
   
            const jsonContent = JSON.stringify({students:this.students , cache:this.cache});
    
            await fs.writeFile("./../data/data.json", jsonContent, 'utf8');
            console.log("The file was saved!");
        } catch(err) {
            console.log(err)
        }

    }

    public async fetchData():Promise<void> {
        try {
            await fs.access(`../data/data.json`, fs.constants.F_OK);
          } catch {
            console.log('No previous data');
            return
          }
        let obj;
        let data = await fs.readFile('../data/data.json', 'utf8');
        obj = JSON.parse(data);
         
        this.students = obj["students"]
        this.cache = obj["cache"]
        console.log("Data loaded successfully")

    }

}