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
const fs = require('fs').promises;
const interfaces_1 = require("./interfaces");
class StudentManager {
    constructor() {
        this.students = {};
        this.cache = {};
    }
    hasStudent(name) {
        return this.students.hasOwnProperty(name);
    }
    setPersonalInfo(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let output = ``;
            switch (input) {
                case 1:
                    output = yield this.setGenericField(`name`);
                    break;
                case 2:
                    do {
                        output = yield (0, interfaces_1.ask)(`Enter gender of student(M for Male, F for Female , O for Other):`);
                    } while (!(output.toLowerCase() === `m` || output.toLowerCase() === `f` || output.toLowerCase() === `o`));
                    break;
                case 3:
                    do {
                        output = yield (0, interfaces_1.ask)(`Enter martial status of student(S for Single, M for Married):`);
                    } while (!(output.toLowerCase() === `s` || output.toLowerCase() === `m`));
                    break;
                case 4:
                    do {
                        output = parseInt(yield (0, interfaces_1.ask)(`Enter age of Student:`));
                    } while (isNaN(output) || !(output >= 0 && output <= 100));
                    break;
                case 5:
                    do {
                        output = yield (0, interfaces_1.ask)(`Enter blood group of Student:`);
                    } while (!(output === `A+` || output === `A-` || output === `B+` ||
                        output === `B-` || output === `O+` || output === `O-` || output === `AB+` ||
                        output === `AB-`));
            }
            return typeof output === `number` ? output : output.toLowerCase();
        });
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
    setStudentInfo(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = {};
            switch (input) {
                case 1:
                    info["name"] = yield this.setPersonalInfo(1);
                    switch (yield this.setPersonalInfo(2)) {
                        case `m`:
                            info["gender"] = `Male`;
                            break;
                        case `f`:
                            info["gender"] = `Female`;
                            break;
                        case `o`:
                            info["gender"] = `Other`;
                    }
                    info["martial_status"] = (yield this.setPersonalInfo(3)) === `s` ? `Single` : `Married`;
                    info[`blood_group`] = yield this.setPersonalInfo(5);
                    info["age"] = yield this.setPersonalInfo(4);
                    break;
                case 2:
                    info["country"] = yield this.setGenericField(`country`);
                    info["state"] = yield this.setGenericField(`state`);
                    info["city"] = yield this.setGenericField(`city`);
                    info["street"] = yield this.setGenericField(`street`);
                    break;
                case 3:
                    let education = [];
                    let data;
                    let flag;
                    do {
                        data = {};
                        data["degree"] = yield this.setGenericField(`degree`);
                        data["institute"] = yield this.setGenericField(`institute`);
                        education.push(data);
                        flag = parseInt(yield (0, interfaces_1.ask)(`If you have no more degrees, Enter 0,otherwise press any key to continue:`));
                        if (flag === 0) {
                            break;
                        }
                    } while (true);
                    info[`previousEducation`] = education;
                    info[`major`] = yield this.setGenericField(`major`);
                    info[`department`] = yield this.setGenericField(`department`);
                    break;
                case 4:
                    info["name"] = yield this.setGenericField("Guardian Name");
                    info["relation"] = yield this.setGenericField("relation");
                    info["phone"] = yield this.setGenericField("Guardian Phone No.");
            }
            return info;
        });
    }
    addStudent(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let choice = ``;
            let progress = 1;
            let info = {}, address = {}, details = {}, emergencyInfo = {};
            let retrievedData = null;
            if (typeof name === `string`) {
                retrievedData = this.cache[name];
                progress = retrievedData.progress;
                if (progress === 2) {
                    info = retrievedData.data.info;
                }
                else if (progress === 3) {
                    info = retrievedData.data.info;
                    address = retrievedData.data.address;
                }
                else if (progress === 4) {
                    info = retrievedData.data.info;
                    address = retrievedData.data.address;
                    details = retrievedData.data.details;
                }
            }
            while (true) {
                if (progress === 1) {
                    info = yield this.setStudentInfo(1);
                    progress = 2;
                    choice = yield (0, interfaces_1.ask)(`If you want to quit and save your progress, press Q:`);
                    if (choice.toLowerCase() === `q`) {
                        this.cacheProgress({ info }, progress);
                        console.log(this.cache);
                        return;
                    }
                }
                else if (progress === 2) {
                    address = yield this.setStudentInfo(2);
                    progress = 3;
                    choice = yield (0, interfaces_1.ask)(`If you want to quit and save your progress, press Q:`);
                    if (choice.toLowerCase() === `q`) {
                        this.cacheProgress({ info, address }, progress);
                        console.log(this.cache);
                        return;
                    }
                }
                else if (progress === 3) {
                    details = yield this.setStudentInfo(3);
                    progress = 4;
                    choice = yield (0, interfaces_1.ask)(`If you want to quit and save your progress, press Q:`);
                    if (choice.toLowerCase() === `q`) {
                        this.cacheProgress({ info, address, details }, progress);
                        console.log(this.cache);
                        return;
                    }
                }
                else if (progress === 4) {
                    emergencyInfo = yield this.setStudentInfo(4);
                    const student = {
                        info: info,
                        address: address,
                        details: details,
                        emergencyInfo: emergencyInfo
                    };
                    this.students[student.info.name] = student;
                    console.log(this.students);
                    if (this.cache.hasOwnProperty(student.info.name)) {
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
                        const tempName = (yield (0, interfaces_1.ask)(`Enter name of student:`)).toLowerCase();
                        if (this.cache.hasOwnProperty(tempName) === true) {
                            yield this.addStudent(tempName);
                        }
                        else {
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
            let data = this.students[name];
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
                        data["info"] = yield this.setStudentInfo(1);
                        delete this.students[name];
                        this.students[data.info.name] = data;
                        return;
                    case 2:
                        data["address"] = yield this.setStudentInfo(2);
                        this.students[name] = data;
                        break;
                    case 3:
                        data["details"] = yield this.setStudentInfo(3);
                        this.students[name] = data;
                        break;
                    case 4:
                        data["emergencyInfo"] = yield this.setStudentInfo(4);
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
    }
    saveData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jsonContent = JSON.stringify({ students: this.students, cache: this.cache });
                yield fs.writeFile("./../data/data.json", jsonContent, 'utf8');
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
                yield fs.access(`../data/data.json`, fs.constants.F_OK);
            }
            catch (_a) {
                console.log('No previous data');
                return;
            }
            let obj;
            let data = yield fs.readFile('../data/data.json', 'utf8');
            obj = JSON.parse(data);
            this.students = obj["students"];
            this.cache = obj["cache"];
            console.log("Data loaded successfully");
        });
    }
}
exports.StudentManager = StudentManager;
