#include <stdio.h>
#include <stdlib.h>

//Let's make a shopping cart program in C
int main(){
    char item[50]= "";
    float price= 0.0f;
    int quantity = 0;
    char currency='$';
    float total= 0.0f;

    printf("What item would you like to buy?: ");
    fgets(item, sizeof(item), stdin);

    printf("What is the price for each?: ");
    scanf("%f", &price);

    printf("How many would you like to buy?: ");
    scanf("%d", &quantity);

    total = price * quantity;

    printf("%.2f", total);



    return 0;
}