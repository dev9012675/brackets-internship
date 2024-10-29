"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentManager = void 0;
const fs_1 = require("fs");
const interfaces_1 = require("./interfaces");
class StudentManager {
    constructor() {
        this.students = {};
        this.cache = {};
    }
    hasStudent(name) {
        return Object.prototype.hasOwnProperty.call(this.students, name);
    }
    setGenericField(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let output = ``;
            do {
                output = yield (0, interfaces_1.ask)(`Enter ${input}:`);
            } while (output.length === 0);
            return output;
        });
    }
    setPersonalInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let userSelection;
            let gender;
            let blood_group;
            let age;
            const name = (yield this.setGenericField(`name`)).toLowerCase();
            do {
                userSelection = (yield (0, interfaces_1.ask)(`Enter gender of student(M for Male, F for Female , O for Other):`)).toLowerCase();
            } while (!(userSelection === `m` || userSelection === `f` || userSelection === `o`));
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
                userSelection = (yield (0, interfaces_1.ask)(`Enter martial status of student(S for Single, M for Married):`)).toLowerCase();
            } while (!(userSelection === `s` || userSelection === `m`));
            const martial_status = userSelection === `s` ? `Single` : `Married`;
            do {
                blood_group = yield (0, interfaces_1.ask)(`Enter blood group of Student:`);
            } while (!(blood_group === `A+` ||
                blood_group === `A-` ||
                blood_group === `B+` ||
                blood_group === `B-` ||
                blood_group === `O+` ||
                blood_group === `O-` ||
                blood_group === `AB+` ||
                blood_group === `AB-`));
            do {
                age = parseInt(yield (0, interfaces_1.ask)(`Enter age of Student:`));
            } while (isNaN(age) || !(age >= 0 && age <= 100));
            return {
                name: name,
                age: age,
                gender: gender,
                martial_status: martial_status,
                blood_group: blood_group,
            };
        });
    }
    setAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const country = yield this.setGenericField(`country`);
            const state = yield this.setGenericField(`state`);
            const city = yield this.setGenericField(`city`);
            const street = yield this.setGenericField(`street`);
            return { country: country, state: state, city: city, street: street };
        });
    }
    setEducation() {
        return __awaiter(this, void 0, void 0, function* () {
            const education = [];
            let degree;
            let institute;
            let flag = 1;
            do {
                degree = yield this.setGenericField(`previous degree`);
                institute = yield this.setGenericField(`the institute where you completed the above mentioned previous degree`);
                education.push({ degree: degree, institute: institute });
                flag = parseInt(yield (0, interfaces_1.ask)(`If you have no more previous degrees, Enter 0,otherwise press any key to continue:`));
            } while (flag !== 0);
            const previousEducation = education;
            const major = yield this.setGenericField(`current major`);
            const department = yield this.setGenericField(`the department where you are studying the above mentioned current major`);
            return {
                major: major,
                previousEducation: previousEducation,
                department: department,
            };
        });
    }
    setEmergencyContact() {
        return __awaiter(this, void 0, void 0, function* () {
            const name = yield this.setGenericField("Guardian Name");
            const relation = yield this.setGenericField("your relation to the above mentioned Guardian");
            const phone = yield this.setGenericField("Guardian Phone No.");
            return {
                name: name,
                relation: relation,
                phone: phone,
            };
        });
    }
    addStudent(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let choice = ``;
            let progress = 1;
            let info = (0, interfaces_1.emptyPersonalInfo)(), address = (0, interfaces_1.emptyAddress)(), details = (0, interfaces_1.emptyStudentDetails)(), emergencyInfo = (0, interfaces_1.emptyEmergencyContact)();
            let retrievedData = null;
            if (typeof name === `string`) {
                retrievedData = this.cache[name];
                progress = retrievedData.progress;
                if (progress === 2) {
                    info = retrievedData.data.info;
                }
                else if (progress === 3 &&
                    typeof retrievedData.data.address !== `undefined`) {
                    info = retrievedData.data.info;
                    address = retrievedData.data.address;
                }
                else if (progress === 4 &&
                    typeof retrievedData.data.address !== `undefined` &&
                    typeof retrievedData.data.details !== `undefined`) {
                    info = retrievedData.data.info;
                    address = retrievedData.data.address;
                    details = retrievedData.data.details;
                }
            }
            while (true) {
                if (progress === 1) {
                    info = yield this.setPersonalInfo();
                    progress = 2;
                    choice = yield (0, interfaces_1.ask)(`If you want to quit and save your progress, press Q:`);
                    if (choice.toLowerCase() === `q`) {
                        this.cacheProgress({ info }, progress);
                        console.log(this.cache);
                        return;
                    }
                }
                else if (progress === 2) {
                    address = yield this.setAddress();
                    progress = 3;
                    choice = yield (0, interfaces_1.ask)(`If you want to quit and save your progress, press Q:`);
                    if (choice.toLowerCase() === `q`) {
                        this.cacheProgress({ info, address }, progress);
                        console.log(this.cache);
                        return;
                    }
                }
                else if (progress === 3) {
                    details = yield this.setEducation();
                    progress = 4;
                    choice = yield (0, interfaces_1.ask)(`If you want to quit and save your progress, press Q:`);
                    if (choice.toLowerCase() === `q`) {
                        this.cacheProgress({ info, address, details }, progress);
                        console.log(this.cache);
                        return;
                    }
                }
                else if (progress === 4) {
                    emergencyInfo = yield this.setEmergencyContact();
                    const student = {
                        info: info,
                        address: address,
                        details: details,
                        emergencyInfo: emergencyInfo,
                    };
                    this.students[student.info.name] = student;
                    console.log(this.students);
                    if (Object.prototype.hasOwnProperty.call(this.cache, student.info.name)) {
                        delete this.cache[student.info.name];
                    }
                    return;
                }
            }
        });
    }
    cacheProgress(data, progress) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cache[data.info.name] = { data, progress };
            return;
        });
    }
    addMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            let tempName;
            let choice = -1;
            while (true) {
                console.log("Here are your options");
                console.log("1: Enter a new student from scratch.");
                console.log("2: Continue from where you left off previously.");
                console.log("3: Go back to previous form.");
                do {
                    choice = parseInt(yield (0, interfaces_1.ask)(`Enter your choice:`));
                } while (isNaN(choice) || !(choice >= 1 && choice <= 3));
                switch (choice) {
                    case 1:
                        yield this.addStudent();
                        break;
                    case 2:
                        if (Object.keys(this.cache).length === 0)
                            console.log(`No students currently present in cache`);
                        else {
                            tempName = (yield (0, interfaces_1.ask)(`Enter name of student:`)).toLowerCase();
                            if (Object.prototype.hasOwnProperty.call(this.cache, tempName) ===
                                true)
                                yield this.addStudent(tempName);
                            else
                                console.log(`Student not found`);
                        }
                        break;
                    case 3:
                        return;
                }
            }
        });
    }
    viewSingleStudentData(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.students[name];
            let choice = -1;
            while (true) {
                console.log("Here are your options");
                console.log("1: View Personal Information of Student.");
                console.log("2: View Address of Student.");
                console.log("3: View Education Information about Student.");
                console.log("4: View Emergency contact Information of Student.");
                console.log("5: Return to previous menu.");
                do {
                    choice = parseInt(yield (0, interfaces_1.ask)(`Enter your choice:`));
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
        });
    }
    updateStudent(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.students[name];
            let choice = -1;
            while (true) {
                console.log("Here are your options");
                console.log("1: Update Personal Information of Student.");
                console.log("2: Update Address of Student.");
                console.log("3: Update Education Information about Student.");
                console.log("4: Update Emergency contact Information of Student.");
                console.log("5: Return to previous menu.");
                do {
                    choice = parseInt(yield (0, interfaces_1.ask)(`Enter your choice:`));
                } while (isNaN(choice) || !(choice >= 1 && choice <= 5));
                switch (choice) {
                    case 1:
                        data["info"] = yield this.setPersonalInfo();
                        delete this.students[name];
                        this.students[data.info.name] = data;
                        return;
                    case 2:
                        data["address"] = yield this.setAddress();
                        this.students[name] = data;
                        break;
                    case 3:
                        data["details"] = yield this.setEducation();
                        this.students[name] = data;
                        break;
                    case 4:
                        data["emergencyInfo"] = yield this.setEmergencyContact();
                        this.students[name] = data;
                        break;
                    case 5:
                        return;
                }
            }
        });
    }
    displayPersonalInfo() {
        Object.values(this.students).forEach((student) => {
            console.table(student.info);
        });
    }
    deleteStudent(name) {
        delete this.students[name];
        console.log(`Student deleted successfully`);
    }
    saveData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jsonContent = JSON.stringify({
                    students: this.students,
                    cache: this.cache,
                });
                yield fs_1.promises.writeFile("./../data/data.json", jsonContent, "utf8");
                console.log("The file was saved!");
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.access(`../data/data.json`, fs_1.promises.constants.F_OK);
            }
            catch (_a) {
                console.log("No previous data");
                return;
            }
            const data = yield fs_1.promises.readFile("../data/data.json", "utf8");
            const obj = JSON.parse(data);
            this.students = obj["students"];
            this.cache = obj["cache"];
            console.log("Data loaded successfully");
        });
    }
    checkEmpty() {
        return Object.keys(this.students).length === 0;
    }
}
exports.StudentManager = StudentManager;
