# Student Records Manager

This is a simple project for practicing JavaScript. You can add new students, calculate the average score and find the highest and lowest total score among students. You can also save the data of the current session and
reload it in a later session.

# ask()

This helper function takes input from the user via the provided prompt using the readline node module.

# add()

This function gets the student name and scores from the user. While getting the scores, it calculates the average , maximum and minimum scores of the student. It also calculates the overall highest total and lowest total score. Finally, it adds an object containing the student name , scores , the average , the total , maximum and minimum score of the student to studentData.



# max()

This function returns the current highest total score in the studentData array. 

# min()

This function returns the current lowest total score in the studentData array. 

# save()

This function saves the current studentData array and the current highest and lowest total scores to a file named data.json. It uses the node fs module for writing data.Please note that calling this function will overwrite any previously saved data.

# fetchData()

This function uses the fs node module to fetch previously saved data. If no data is found, it indicates
that via a message to the user. 

# showStudents()

This function lists all the students currently present in the studentData array along with their scores.
The maximum , minimum and average and total scores are also displayed



# number

This is a closure which tracks the number of students currently present in the studentData array. It 
contains a students variable which tracks the number of students in the system. It also contains a
getter function to get the value of students , an increment function which increments students by 
1 , and  a setStudents function which sets the students variable to the provided value.

# main()

This function serves as the starting point for program execution. It shows a menu to the user and  controls program execution by directing calls to the other functions based on user input.

# Challenges Faced

The most challenging part of this project was writing data to the data.json file and then fetching that data.
