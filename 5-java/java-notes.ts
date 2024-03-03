/*
jshell > to run java code
jshell> /help
jshell> /list
jshell> System.out.println("Hello World!")
Hello World!

=============
primitive types
---------------
byte
short
int
long
float
double
char
boolean

====================
* you can use '_' in int values
int minVal = -2_147_483_648; // 32 bit (4 bytes) (2^31) // Integer.MIN_VALUE;
int maxVal = 2_147_483_647; // Integer.MAX_VALUE;
byte minByteVal = -128; // 8 bit (1 byte)
byte maxByteVal = 128;
short minShortVal = -32767; // 16 bit (2 bytes)
long minLongVal = 100L // 64 bit (8 bytes) (2^63)

long 

A numeric literal that exceeds Integer.MAX_VALUE must use the 'L' suffix.
We cannot create a numeric literal in java, that exceeds Integer.MAX_VALUE, without using the 'L' suffix, we'll always get the error 'integer number too large'.

long bigLongVal = 2_147_483_647_234 // Error: integer number too large
long bigLongVal = 2_147_483_647_234L // no error as we added "L"

type casting
-------------
byte myByteval = (byte)

*Long can hold int, so no need to type cast.

int k = 5 / 3 ; // 1 // 32 bit (4 bytes)
float x = 5f / 3f; // 1.6666666 // 32 bit (4 bytes)
double y = 5d / 3d; // 1.6666666666666667 //64 bit (8 bytes)

for mathematical calculations use double
1. faster on lot of computers
2. java inbuilt functions uses double
3. more precise, 16 digits of precision

char myChar = 'D'; 16 bits (2 bytes) // use single quotes
char myChar = '\u0044'; // D
char myChar = 68'; // D

char firstChar = 'A';
char secondChar = 'B';
System.out.print(firstChar + secondChar); // (65+66) 131 - Ascii value
System.out.print("" + firstChar + secondChar); // AB

boolean flag = false; // how many bits? It's virtual machine dependent.

-------------------------------

String : is a sequence of characters // use double quotes

String class is immutable, but can be used much like a primitive data type.

StringBuilder class is mutable, but does not share the Spring's special features, such as being able to assign it a String literal or use the + operator on it.

Both are classes, but the String class is in a special category in the Java language.


*/