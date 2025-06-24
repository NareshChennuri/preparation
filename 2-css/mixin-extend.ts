/*

Mixins - When you use a mixin, its CSS is copied into each place you include it.
Extends - The selector gets all the styles from the extended selector like inheritance in OOP, without repeating the CSS code.


In SCSS (Sassy CSS), 

Mixins are a powerful way of creating dynamic and reusable styles, 

@mixin highlight-text {
  color: red;
  font-size: 25px;
  font-weight: bold;
  border: 1px solid blue;
}


- using Mixins we can define 
- reusable blocks of CSS code

Mixins are handy for applying consistent styles across your project, 
- it reduces redundancy
- makes code more modular and maintainable
- useful with vendor prefixing
- creating complex layouts
- generating utility classes.

A mixin is created using the @mixin directive followed by a name and a block of CSS code. You can include variables within mixins to make them more flexible.

To use a mixin, you use the @include directive followed by the name of the mixin. This inserts the CSS defined in the mixin at that point in your stylesheet.

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


Mixins are used for generating reusable blocks of styles with dynamic values, 
while extends are used for sharing styles between selectors.

Mixins allow for parameterization and dynamic generation of styles, 
while extends simply inherit styles from other selectors.

Mixins can result in increased CSS output size if used excessively, 
while extends can lead to cleaner output but can cause specificity issues if used improperly.

Mixins are more flexible and powerful for creating dynamic and reusable styles, 
while extends are more straightforward and suitable for sharing common styles.
*/