import readline from "readline";

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const ask = (msg: string): Promise<string> =>
  new Promise((resolve) =>
    rl.question(msg, (response: string) => resolve(response)),
  );

export interface PersonalInfo {
  name: string;
  age: number;
  gender: `Male` | `Female` | `Other` | ``;
  martial_status: `Single` | `Married` | ``;
  blood_group: `A+` | `A-` | `B+` | `B-` | `O+` | `O-` | `AB+` | `AB-` | ``;
}

export const emptyPersonalInfo = (): PersonalInfo => ({
  name: ``,
  age: 0,
  gender: ``,
  martial_status: ``,
  blood_group: ``,
});

export interface Address {
  country: string;
  state: string;
  city: string;
  street: string;
}

export const emptyAddress = (): Address => ({
  country: ``,
  state: ``,
  city: ``,
  street: ``,
});

export interface Education {
  degree: string;
  institute: string;
}

export const emptyEducation = (): Education[] => {
  const education: Education[] = [];
  return education;
};

export interface StudentDetails {
  major: string;
  previousEducation: Education[];
  department: string;
}

export const emptyStudentDetails = (): StudentDetails => ({
  major: ``,
  previousEducation: emptyEducation(),
  department: ``,
});

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export const emptyEmergencyContact = (): EmergencyContact => ({
  name: ``,
  relation: ``,
  phone: ``,
});

export interface Student {
  info: PersonalInfo;
  address: Address;
  details: StudentDetails;
  emergencyInfo: EmergencyContact;
}

export type StudentMap = {
  [key: string]: Student;
};

export interface TempData {
  info: PersonalInfo;
  address?: Address;
  details?: StudentDetails;
}

export interface CacheData {
  data: TempData;
  progress: number;
}

export type CacheMap = {
  [key: string]: CacheData;
};
