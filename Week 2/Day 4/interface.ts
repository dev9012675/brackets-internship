export enum Grade {
    Freshman = `freshman` , 
    Sophomore = `sophomore` ,
    Junior = `junior` ,
    Senior = `senior`
}


export interface Student {
    name:string  ,
    age:number ,
    scores:number[] , 
    address: string
    grade:Grade
}

export interface FilterObjects<T> {
    value: T;
    index?: number;
    Array?: T[];
  }
  

