#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <math.h>
#include <stdlib.h>
#include <time.h>
#include <ctype.h>
#include <unistd.h>
//make sure to include your header files
//these are the function prototypes for the functions you will implement in your banking program
//used to know that these functions exist before they are called in the main function
int main(){
    //let's make a working digital clock in C
    //we will use the time.h library to get the current time
    time_t rawtime = 0; // 1 Jan 1970, the epoch time
    struct tm *pTime = NULL; // pointer to a struct tm that will hold the current time, point to NULL for now
    bool isRunning = true; // boolean variable to control the while loop

    printf("DIGITAL CLOCK\n");

    while(isRunning){

        //update the current time
        time(&rawtime); // get the current time in seconds since the epoch

        pTime = localtime(&rawtime); // convert the time to local time and store it in the struct tm

        printf("\r%02d:%02d:%02d", pTime->tm_hour, pTime->tm_min, pTime->tm_sec); // print the current time, dereference the pointer to access the struct members
        //\r is used to return the cursor to the beginning of the line so that the next time we print, it will overwrite the previous time

        sleep(1); // sleep for 1 second
    }



    return 0;
}