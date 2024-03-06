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

---------------------------
What are the different methods every class inherited from Object 

    @Override
    - equals(Object obj)
    - hashCode() // memory location of the obj
    - finalize()
    - clone()
    - toStirng() // Student@23827693 ==> classname & hexdec number of mem location
----------------------------
String Immutability

- Memory 
- Thread Safe
- Security
----------------------------
== vs equals()

== -> compares the memory location (shallow comp)
equals -> by default do the same as '==', except for String Primitives and Enums
 -> you can implement deep comp by overriding
 
    String s1 = new String("abc");
    String s2 = new String("abc");

    s1==s2 // false
    s1.equals(s2) // true

    Integer i1 = 123;
    Integer i2 = 123;

    i1==i2 // false
    i1.equals(i2) // true
----------------------------------
final finally and finalize

final -> const you can override class / method / variables

finally -> try catch finally (close the resources)

finalize() -> JVM calls before the garbage collection
    -> you can use it for cleanup of the resources
----------------------------------
Generics & Type Erasure

- We can specify the data type 

    List<Integer> empIds = new ArrayList<>;
    empIds.add(123);
    empIds.add("John"); //Compiler error

- Type Erasure (After compilation generics code will be removed at the runtime for backword comparision)    

----------------------------------
Collections frame work important Classes/Interfaces

List (dups) - Set (No dups) - Queue (FIFO) - BlockingQueue (Producer & Consumer pattern) - Map (Key, Value pairs)

List -> ArrayList, LinkedList, Vector
Set -> HashSet->LinkedHashSet, SortedSet->TreeSet
Queue -> PriorityQueue
BlockingQueue
Map -> HashMap->LinkedHashMap, Hashtable, SortedMap->TreeMap


ArrayList -> Array (Usecase: Read Intensive)
    - Add O(n)
    - RandomAccess O(1)

LinkedList -> Prev Next (Usecase: if there are more update)
    - Add O(1)    
    - RandomAccess O(n)

Vector -> ThreadSafe (but slow, degrades performance)    
----------------------------------

----------------------------------

----------------------------------

----------------------------------

----------------------------------

----------------------------------

----------------------------------



*/