/*
toLowerCase()
toUpperCase()
toString()
substring()
includes()
match()
concat()
trim()
eval()
replace()
test()
repeat()
search()
encodeURI()

1. Lowercase Method: toLowerCase()
The lowercase method returns a string with all values converted to lowercase letters.

Lowercase Method Example
str.toLowerCase();
/*Would return the string, 
"i’m a timelord from the planet gallifrey."

2. Uppercase Method: toUpperCase()
The uppercase method returns a string with all values converted to uppercase.

Uppercase Method Example
JS
str.toUpperCase();
/*Would return the string, 
"I’M A TIMELORD FROM THE PLANET GALLIFREY."

3. String Method: toString()
The string method returns a string or string object as a string.

String Method Example
JS
let num = 904;
num.toString();
/*Would return “904”

4. Substring Method: substring()
The substring method extracts characters from a string between two specified indices.

Substring Method Example
JS
str.substring(31, 40);
/*Would return the string “Gallifrey”. 
NOTE: Excluding the second index will return 
all characters after the start index.

5. Includes Method: includes()
The includes method returns a string if it contains a specified value.

Includes Method Example
JS
str.includes("Timelord");
/*Would return boolean true

6. Match Method: match()
The match method returns a string object with a matching value.

Match Method Example
JS
str.match("Timelord");
/*Would return an array object with 
the matched value. Regular expressions 
can also be used.

7. Concat Method: concat()
The contact method returns two or more joined strings.

Concat Method Example
JS
str.concat(” I’m The Doctor, look me up!”);
/*Would return “I’m a Timelord from the planet Gallifrey. I’m The Doctor, look me up!”

8. Trim Method: trim()
The trim method removes unneeded whitespace from the start and end of a string.

Trim Method Example
JS
const str = "   Welcome to HubSpot    ";
const newMessage = str.trim();

console.log(newMessage);

/*Would return: Welcome to HubSpot

9. Eval Method: eval()
The eval method allows code written as a string to be evaluated and executed.

Eval Method Example
JS
let expression = "2 + 3";
let answer = eval(expression);

console.log(answer);

/*Would return 5

10. Replace Method: replace()
The string replace method returns a new string to replace a piece of an existing string. 

Replace Method Example
JS
let text = "Hello HubSpot!";
let result = text.replace("HubSpot", "Reader");

console.log(result);

/*In this example, the replace method searches for 
‘HubSpot’ and replaces it with ‘Reader’. The resulting 
string is “Hello Reader!”. 

11. Test Method: test()
The test method checks if there is a match in a string. It returns the value, True or False, depending on the outcome.

Test Method Example
JS
let text = "Hello Reader";
let result = text.test("o");

console.log(result);

/*In this example, the test method returns true because there is an 'o' in our string. 

12. Repeat Method: repeat()
The repeat() method is used to repeat a given string a specified number of times.

Repeat Method Example
JS
let sayHello = "Hello HubSpotter!".repeat(3);

console.log(sayHello);

/*In this example, the repeat() method repeats 
a given string (‘Hello HubSpotter!’) three times. 
The output is then printed out on the console. 

13. Search Method: search()
The search() method is used to search for a pattern in a string and returns the index position of the match.

Search Method Example
JS
let text = "Hello HubSpotter!";

console.log(text.search("HubSpotter"));

/*In this example, the search() method is used 
to search for the string ‘HubSpotter’ in the string 
‘Hello HubSpotter!’. The output is then printed out 
on the console, which is 6 – indicating that the 
pattern matches at index position 6. 

14. Escape Method: escape()
The escape method returns a string that’s encoded so it can be transmitted to different computers on different networks.

Note: This function has been deprecated and is not recommended for use. Instead, you can use the encodeURI() function.

Escape Method Example
JS
let specialCharacters = escape("I'm John Smith!");

console.log(specialCharacters);

/*In this example, the escape() method is used to encode 
special characters in a string ("I'm John Smith!"). The 
output is then printed out on the console. 

*/