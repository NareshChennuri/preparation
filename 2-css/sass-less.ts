/* Syntacically Awesome Stylesheet & Sassy CSS

SCSS and Sass streamline CSS development 
- we have some advanced features like

- variables, 
- nested rules, 
- mixins, 
- imports, 
- inheritance (@extend), 
- built-in functions 
  - str-index(), str-index(), quote(), unquote()
  - lighten(), darken(), saturate(), desaturate(), rgba(), mix()
  - round(), ceil(), floor(), min(), max()

more modular, 
reusable, 
and easier to maintain css code. 

Pre-processors
====================
A browser does not understand Sass code. 
Therefore, you will need a Sass pre-processor to convert Sass code into standard CSS.

This process is called transpiling. So, you need to give a transpiler (some kind of program) some Sass code and then get some CSS code back.

Preprocessors also provide a way to organize stylesheets and generate optimized CSS for production. 

Variables
=======================
/* define variables for the primary colors 
$primary_1: #a2b9bc;
$primary_2: #b2ad7f;
$primary_3: #878f99;

/* use the variables 
.main-header {
  background-color: $primary_1;
}

.menu-left {
  background-color: $primary_2;
}

.menu-right {
  background-color: $primary_3;
}

Imports
=======================

The @import directive allows you to include the content of one file in another.

@import "variables";
@import "colors";
@import "reset";


Nesting
=======================

Basic nesting refers to the ability to have a declaration inside of a declaration.

SCSS Style
------------
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}

CSS Style
--------------------
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}

Partials
========================
If you start the filename with an underscore, Sass will not transpile it. 
these are called partials 

ex: '_colors.scss'

$myPink: #EE82EE;
$myBlue: #4169E1;
$myGreen: #8FBC8F;

@import "colors";

body {
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  color: $myBlue;
}

@mixin
========================
using mixin you can create reusable css code, 
and we can use it throughout the website.

@mixin highlight-text {
  color: red;
  font-size: 25px;
  font-weight: bold;
  border: 1px solid blue;
}

.danger {
  @include highlight-text;
  background-color: green;
}

A mixin can also include other mixins:

@mixin special-text {
  @include highlight-text;
  @include link;
  @include special-border;
}

You can create Mixin functions as well which will accept arguments.
and you can pass variables to the mixin function

It is also possible to define default values for mixin variables:

@mixin bordered($color: blue, $width: 1px) {
  border: $width solid $color;
}

Another good use of a mixin is for vendor prefixes.

@mixin transform($property) {
  -webkit-transform: $property;
  -ms-transform: $property;
  transform: $property;
}

.myBox {
  @include transform(rotate(20deg));
}

@extend
===========================
The @extend directive lets you share a set of CSS properties from one selector to another.

.button-basic  {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report  {
  @extend .button-basic;
  background-color: red;
}

--------------
functions

String functions

str-length("Hello world!")
Result: 12

to-lower-case("Hello World!")
Result: "hello world!"

str-slice("Hello world!", 2, 5)
Result: "ello"

Numeric functions

abs(15)
Result: 15
abs(-15)
Result: 15

max(5, 7, 9, 0, -3, -7)
Result: 9

min(5, 7, 9, 0, -3, -7)
Result: -7

random(6)
Result: 4

List functions

join(a b c, d e f)
Result: a b c d e f

length(a b c)
Result: 3

nth(a b c, 3)
Result: c


===============

Both Sass and Less are CSS preprocessors.

Both Sass and Less have very similar features. 
Sass uses Ruby whereas Less uses Javascript. There are syntactical differences, for example, Sass uses $ for variables whereas less uses @.
There are some slightly more subjective differences,


SCSS known as the indented syntax provides a more concise way of writing CSS.

*/