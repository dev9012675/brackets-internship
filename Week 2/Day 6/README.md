# Student Records Manager

This is a simple project for practicing TypeScript. You can add new students, view , update and delete the data of the available students . You can also save the data of the current session and
reload it in a later session.

# interfaces.ts

## ask() :-

This helper function takes input from the user via the provided prompt using the readline node module.

## PersonalInfo :-

This interface is used for storing the personal information of a student.

## Address :-

This interface is used for storing the address of a student.

## Education :-

This interface is used for storing the previous education of a student.

## StudentDetails :-

This interface is used for storing the  education of a student. The Education array
stores the previous education while the major and department fields are for the current major
being pursued.

## EmergencyContact :-

This interface is used for storing the contact info of the student's guardian.

## empty(InterfaceName)() :-

These helper functions are used to create a dummy  object of their respective
interface type so that it can be populated with actual data later on.

## Student :- 

This interfaces combines  the PersonalInfo , Address , Education , StudentDetails  and
EmergencyContact Interfaces to store student data.

## StudentMap:-

Used to store student data in the StudentManager class. It uses student emails as keys.
The values are Student Objects

## TempData:-

Used to store the data of students if the user quits adding student when prompted.

## CacheData:-
                
Stores the data of students if the user quits adding student when prompted as well
as the progress of the student creation process.

## CacheMap:- 

Used to store cached student data in the StudentManager class. It uses student emails as keys. 
The values are CacheData objects

# StudentManager.ts

## hasStudent():- 

Checks if the student with the provided email actually exists in the system.

## setGenericField():-

Helper function used to get user input for string fields.

## setPersonalInfo():-

Returns a PersonalInfo object by prompting the user for input.

## setAddress():-

Returns a Address object by prompting the user for input.

## setEducation():-

Returns a StudentDetails object by prompting the user for input.

## setEmergencyContact():-

Returns a EmergencyContact object by prompting the user for input.

## addStudent():-

Generates a Student object by prompting the user for input via the
above mentioned functions. If a user wants to save their progress and do something else, they
are prompted  at different points during the execution of the function.

## cacheProgress():-

If a user wants to save their progress in creating a student and do something else ,
their progress is saved via this function.

## addMenu():-

This menu is displayed when the user wants to add a student. If a user wants to continue
from where they left off while creating a student, they can do so by entering the email 
of their student at the prompt.


## viewSingleStudentData():-

This function is used when the user wants to view all the data of a single student. It fetches 
the student via a provided email.

## updateStudent():-

This function is used when the user wants to update the data of a single student.It fetches 
the student to update via a provided email.


## displayPersonalInfo():-

This function displays the personal information of all the students present in the system.
        

## deleteStudent():-

This function deletes the student having the provided email from the system.

## saveData()

This function saves the current students object and the current cache object to a file named data.json. It uses the node fs module for writing data.Please note that calling this function will overwrite any previously saved data.

## fetchData()

This function uses the fs node module to fetch previously saved data. If no data is found, it indicates
that via a message to the user.

## checkEmpty():-

Checks if any students actually exist in the system.



# main.ts

This file serves as the starting point for program execution. It shows a menu to the user and controls program execution by directing calls to the StudentManager class functions  based on user input.

# Challenges Faced

The most challenging part of this project was saving user progress towards creating a new student and 
allowing them to continue from where they left off.
