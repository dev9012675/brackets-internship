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
const studentManager_1 = require("./studentManager");
const interfaces_1 = require("./interfaces");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const manager = new studentManager_1.StudentManager();
    console.log("Welcome to this Student Records Manager");
    let tempName;
    let choice = -1;
    while (true) {
        console.log("Here are your options");
        console.log("1: Enter a new student.");
        console.log("2: View a complete list of the currently stored students.");
        console.log("3: View the data of a single student.");
        console.log("4: Update data of an existing student.");
        console.log("5: Save current data.");
        console.log("6: Load previous data.");
        console.log("7: Delete a student.");
        console.log("8: Quit program.");
        do {
            choice = parseInt(yield (0, interfaces_1.ask)(`Enter your choice:`));
        } while (isNaN(choice) || !(choice >= 1 && choice <= 8));
        switch (choice) {
            case 1:
                yield manager.addMenu();
                break;
            case 2:
                if (manager.checkEmpty() === true)
                    console.log(`No students currently present in system`);
                else
                    manager.displayPersonalInfo();
                break;
            case 3:
                if (manager.checkEmpty() === true)
                    console.log(`No students currently present in system`);
                else {
                    tempName = (yield (0, interfaces_1.ask)(`Enter name of student:`)).toLowerCase();
                    if (manager.hasStudent(tempName) === true)
                        yield manager.viewSingleStudentData(tempName);
                    else
                        console.log(`Student not found`);
                }
                break;
            case 4:
                if (manager.checkEmpty() === true)
                    console.log(`No students currently present in system`);
                else {
                    tempName = (yield (0, interfaces_1.ask)(`Enter name of student:`)).toLowerCase();
                    if (manager.hasStudent(tempName) === true)
                        yield manager.updateStudent(tempName);
                    else
                        console.log(`Student not found`);
                }
                break;
            case 5:
                yield manager.saveData();
                break;
            case 6:
                yield manager.fetchData();
                break;
            case 7:
                if (manager.checkEmpty() === true)
                    console.log(`No students currently present in system`);
                else {
                    tempName = (yield (0, interfaces_1.ask)(`Enter name of student:`)).toLowerCase();
                    if (manager.hasStudent(tempName) === true)
                        manager.deleteStudent(tempName);
                    else
                        console.log(`Student not found`);
                }
                break;
            case 8:
                console.log("Thank you for using this program.");
                interfaces_1.rl.close();
                return;
        }
    }
});
main();
