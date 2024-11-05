export interface PersonalInfo {
    name: string;
    email: string;
    age: number;
    gender: string;
  
  }

export interface Address {
    country:string
    state:string
    city:string
    street:string
}

export interface GradeInfo {
    scores:number[]
    grade:string
}

export interface EmergencyContact {
    name: string;
    relation: string;
    phone: string;
  }