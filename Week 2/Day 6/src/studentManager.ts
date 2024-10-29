import { promises as fs } from "fs";
import {
  PersonalInfo,
  Address,
  Education,
  StudentDetails,
  EmergencyContact,
  Student,
  TempData,
  CacheData,
  ask,
  StudentMap,
  CacheMap,
  emptyPersonalInfo,
  emptyAddress,
  emptyEmergencyContact,
  emptyStudentDetails,
} from "./interfaces";

export class StudentManager {
  private students: StudentMap;
  private cache: CacheMap;

  constructor() {
    this.students = {};
    this.cache = {};
  }

  public hasStudent(name: string) {
    return Object.prototype.hasOwnProperty.call(this.students, name);
  }

  public async setGenericField(input: string): Promise<string> {
    let output: string = ``;
    do {
      output = await ask(`Enter ${input}:`);
    } while (output.length === 0);
    return output;
  }

  public async setPersonalInfo(): Promise<PersonalInfo> {
    let userSelection: string;
    let gender: `Male` | `Female` | `Other`;
    let blood_group: string;
    let age: number;
    const name: string = (await this.setGenericField(`name`)).toLowerCase();

    do {
      userSelection = (
        await ask(
          `Enter gender of student(M for Male, F for Female , O for Other):`,
        )
      ).toLowerCase();
    } while (
      !(userSelection === `m` || userSelection === `f` || userSelection === `o`)
    );

    switch (userSelection) {
      case `m`:
        gender = `Male`;
        break;
      case `f`:
        gender = `Female`;
        break;
      default:
        gender = `Other`;
    }

    do {
      userSelection = (
        await ask(
          `Enter martial status of student(S for Single, M for Married):`,
        )
      ).toLowerCase();
    } while (!(userSelection === `s` || userSelection === `m`));

    const martial_status: `Single` | `Married` =
      userSelection === `s` ? `Single` : `Married`;

    do {
      blood_group = await ask(`Enter blood group of Student:`);
    } while (
      !(
        blood_group === `A+` ||
        blood_group === `A-` ||
        blood_group === `B+` ||
        blood_group === `B-` ||
        blood_group === `O+` ||
        blood_group === `O-` ||
        blood_group === `AB+` ||
        blood_group === `AB-`
      )
    );

    do {
      age = parseInt(await ask(`Enter age of Student:`));
    } while (isNaN(age) || !(age >= 0 && age <= 100));

    return {
      name: name,
      age: age,
      gender: gender,
      martial_status: martial_status,
      blood_group: blood_group,
    };
  }

  public async setAddress(): Promise<Address> {
    const country: string = await this.setGenericField(`country`);
    const state: string = await this.setGenericField(`state`);
    const city: string = await this.setGenericField(`city`);
    const street: string = await this.setGenericField(`street`);
    return { country: country, state: state, city: city, street: street };
  }

  public async setEducation(): Promise<StudentDetails> {
    const education: Education[] = [];
    let degree: string;
    let institute: string;
    let flag: number = 1;
    do {
      degree = await this.setGenericField(`previous degree`);
      institute = await this.setGenericField(
        `the institute where you completed the above mentioned previous degree`,
      );
      education.push({ degree: degree, institute: institute });
      flag = parseInt(
        await ask(
          `If you have no more previous degrees, Enter 0,otherwise press any key to continue:`,
        ),
      );
    } while (flag !== 0);
    const previousEducation: Education[] = education;
    const major: string = await this.setGenericField(`current major`);
    const department: string = await this.setGenericField(
      `the department where you are studying the above mentioned current major`,
    );
    return {
      major: major,
      previousEducation: previousEducation,
      department: department,
    };
  }

  public async setEmergencyContact(): Promise<EmergencyContact> {
    const name: string = await this.setGenericField("Guardian Name");
    const relation: string = await this.setGenericField(
      "your relation to the above mentioned Guardian",
    );
    const phone: string = await this.setGenericField("Guardian Phone No.");
    return {
      name: name,
      relation: relation,
      phone: phone,
    };
  }

  public async addStudent(name?: string): Promise<void> {
    let choice: string = ``;
    let progress: number = 1;
    let info: PersonalInfo = emptyPersonalInfo(),
      address: Address = emptyAddress(),
      details: StudentDetails = emptyStudentDetails(),
      emergencyInfo: EmergencyContact = emptyEmergencyContact();
    let retrievedData: CacheData | null = null;

    if (typeof name === `string`) {
      retrievedData = this.cache[name];
      progress = retrievedData.progress;

      if (progress === 2) {
        info = retrievedData.data.info;
      } else if (
        progress === 3 &&
        typeof retrievedData.data.address !== `undefined`
      ) {
        info = retrievedData.data.info;
        address = retrievedData.data.address;
      } else if (
        progress === 4 &&
        typeof retrievedData.data.address !== `undefined` &&
        typeof retrievedData.data.details !== `undefined`
      ) {
        info = retrievedData.data.info;
        address = retrievedData.data.address;
        details = retrievedData.data.details;
      }
    }

    while (true) {
      if (progress === 1) {
        info = await this.setPersonalInfo();
        progress = 2;
        choice = await ask(
          `If you want to quit and save your progress, press Q:`,
        );
        if (choice.toLowerCase() === `q`) {
          this.cacheProgress({ info }, progress);
          console.log(this.cache);
          return;
        }
      } else if (progress === 2) {
        address = await this.setAddress();
        progress = 3;
        choice = await ask(
          `If you want to quit and save your progress, press Q:`,
        );
        if (choice.toLowerCase() === `q`) {
          this.cacheProgress({ info, address }, progress);
          console.log(this.cache);
          return;
        }
      } else if (progress === 3) {
        details = await this.setEducation();
        progress = 4;
        choice = await ask(
          `If you want to quit and save your progress, press Q:`,
        );
        if (choice.toLowerCase() === `q`) {
          this.cacheProgress({ info, address, details }, progress);
          console.log(this.cache);
          return;
        }
      } else if (progress === 4) {
        emergencyInfo = await this.setEmergencyContact();
        const student: Student = {
          info: info,
          address: address,
          details: details,
          emergencyInfo: emergencyInfo,
        };
        this.students[student.info.name] = student;
        console.log(this.students);
        if (
          Object.prototype.hasOwnProperty.call(this.cache, student.info.name)
        ) {
          delete this.cache[student.info.name];
        }
        return;
      }
    }
  }

  public async cacheProgress(data: TempData, progress: number): Promise<void> {
    this.cache[data.info.name] = { data, progress };
    return;
  }

  public async addMenu(): Promise<void> {
    let tempName: string;
    let choice: number = -1;
    while (true) {
      console.log("Here are your options");
      console.log("1: Enter a new student from scratch.");
      console.log("2: Continue from where you left off previously.");
      console.log("3: Go back to previous form.");

      do {
        choice = parseInt(await ask(`Enter your choice:`));
      } while (isNaN(choice) || !(choice >= 1 && choice <= 3));

      switch (choice) {
        case 1:
          await this.addStudent();
          break;

        case 2:
          if (Object.keys(this.cache).length === 0)
            console.log(`No students currently present in cache`);
          else {
            tempName = (await ask(`Enter name of student:`)).toLowerCase();
            if (
              Object.prototype.hasOwnProperty.call(this.cache, tempName) ===
              true
            )
              await this.addStudent(tempName);
            else console.log(`Student not found`);
          }
          break;

        case 3:
          return;
      }
    }
  }

  public async viewSingleStudentData(name: string): Promise<void> {
    const data: Student = this.students[name];
    let choice: number = -1;
    while (true) {
      console.log("Here are your options");
      console.log("1: View Personal Information of Student.");
      console.log("2: View Address of Student.");
      console.log("3: View Education Information about Student.");
      console.log("4: View Emergency contact Information of Student.");
      console.log("5: Return to previous menu.");

      do {
        choice = parseInt(await ask(`Enter your choice:`));
      } while (isNaN(choice) || !(choice >= 1 && choice <= 5));

      switch (choice) {
        case 1:
          console.table(data["info"]);
          break;

        case 2:
          console.table(data["address"]);
          break;

        case 3:
          console.table(data["details"]);
          break;

        case 4:
          console.table(data["emergencyInfo"]);
          break;

        case 5:
          return;
      }
    }
  }

  public async updateStudent(name: string): Promise<void> {
    const data: Student = this.students[name];
    let choice: number = -1;
    while (true) {
      console.log("Here are your options");
      console.log("1: Update Personal Information of Student.");
      console.log("2: Update Address of Student.");
      console.log("3: Update Education Information about Student.");
      console.log("4: Update Emergency contact Information of Student.");
      console.log("5: Return to previous menu.");

      do {
        choice = parseInt(await ask(`Enter your choice:`));
      } while (isNaN(choice) || !(choice >= 1 && choice <= 5));

      switch (choice) {
        case 1:
          data["info"] = await this.setPersonalInfo();
          delete this.students[name];
          this.students[data.info.name] = data;
          return;

        case 2:
          data["address"] = await this.setAddress();
          this.students[name] = data;
          break;

        case 3:
          data["details"] = await this.setEducation();
          this.students[name] = data;
          break;

        case 4:
          data["emergencyInfo"] = await this.setEmergencyContact();
          this.students[name] = data;
          break;

        case 5:
          return;
      }
    }
  }

  public displayPersonalInfo(): void {
    Object.values<Student>(this.students).forEach((student) => {
      console.table(student.info);
    });
  }

  public deleteStudent(name: string): void {
    delete this.students[name];
    console.log(`Student deleted successfully`);
  }

  public async saveData(): Promise<void> {
    try {
      const jsonContent = JSON.stringify({
        students: this.students,
        cache: this.cache,
      });

      await fs.writeFile("./../data/data.json", jsonContent, "utf8");
      console.log("The file was saved!");
    } catch (err) {
      console.log(err);
    }
  }

  public async fetchData(): Promise<void> {
    try {
      await fs.access(`../data/data.json`, fs.constants.F_OK);
    } catch {
      console.log("No previous data");
      return;
    }

    const data: string = await fs.readFile("../data/data.json", "utf8");
    const obj = JSON.parse(data);

    this.students = obj["students"];
    this.cache = obj["cache"];
    console.log("Data loaded successfully");
  }

  public checkEmpty(): boolean {
    return Object.keys(this.students).length === 0;
  }
}
