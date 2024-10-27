import readline from 'readline'

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  export const ask = (msg:string):Promise<string> => new Promise(resolve => 
      rl.question(msg, (response:string) => resolve(response))
    );



export interface PersonalInfo {
    name:string
    age:number
    gender:`Male`|`Female`|`Other`
    martial_status:`Single`|`Married`
    blood_group:`A+`|`A-`|`B+`|`B-`|`O+`|`O-`|`AB+`|`AB-`
}

export interface Address {
    country:string
    state:string 
    city:string
    street:string

}


export interface Education {
    degree:string ,
    institute:string
}

export interface StudentDetails {
    major:string
    previousEducation:Education[]
    department:string

}


export interface EmergencyContact {
    name: string
    relation:string
    phone:string
}

export interface Student {
    info:PersonalInfo
    address:Address
    details:StudentDetails
    emergencyInfo:EmergencyContact
}

