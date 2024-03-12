/*

Box-model
---------------
a box that wraps around every HTML element. It consists of: content, padding, borders and margins

Content - The content of the box, where text and images appear
Padding - Clears an area around the content. The padding is transparent
Border - A border that goes around the padding and content
Margin - Clears an area outside the border. The margin is transparent

Border-box
------------------
If you want to make sure that all form elements in your design have the same height, just declare box-sizing: border-box

* { box-sizing: border-box } // Include padding and border in the element's total width and height:
  


Specificity is calculated based on the selector type 

Inline Styles: 
  have the highest specificity. They are applied directly to an element using the style attribute.

ID Selectors: 
  have higher specificity than class selectors and element selectors. They are denoted by a hash (#) followed by the ID name.

Class Selectors, Attribute Selectors, and Pseudo-Classes: 
  These selectors have equal specificity. They are denoted by a period (.) for classes, square brackets ([]) for attribute selectors, and a colon (:) for pseudo-classes.

Element Selectors, Pseudo-Elements: 
  These selectors have the lowest specificity. They target HTML elements directly (e.g., div, p, span) or pseudo-elements (e.g., ::before, ::after).

-------------

div, p - Selects all <div> elements and all <p> elements
div p - Selects all <p> elements that are anywhere inside a <div> element
div > p - Selects all <p> elements where the immediate parent is a <div> element
div + p - Selects the first <p> elements that is placed immediately after a <div> element
div ~ p - Selects all <p> elements that are anywhere preceded by a <div> element

-------------

add content using css

.task-list:before {
  content: "Joe's Task: ";
}

------------------------------

CSS Pseudo Elements
   ::after
   ::before
   ::first-letter
   ::first-line
   ::selection
 
   CSS Pseudo Classes
   :nth-child(n)
   :active
   :checked
   :disabled

   
background: linear-gradient(to right, #ff0000, #00ff00);

animation
------------

@keyframes slide-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.element {
  animation: slide-in 1s forwards;
}

css variables or custom properties
----------------------------------
:root {
  --primary-color: #007bff;
}

.element {
  color: var(--primary-color);
}

Display Types
----------------------
display: block;

  Elements with this property value create a block-level box.
  Block-level elements start on a new line and take up the full width available.
  Examples include <div>, <p>, <header>, <footer>, <section>, etc.

display: inline;

  Elements with this property value generate an inline box.
  Inline elements do not start on a new line and only take up as much width as necessary.
  Examples include <span>, <a>, <strong>, <em>, input button etc.

display: inline-block;

  Combines features of both block and inline elements.
  Similar to inline elements, but can have margins, padding, and width/height.
  Elements are displayed inline, but can have block-level properties applied.
  Useful for creating elements that flow horizontally and can have block-level styling.

display: flex;

  Establishes a flex container for its children.
  Allows for flexible layouts and distribution of space among items in a container.
  Flex items can be laid out in any direction (row or column) and can be aligned and ordered accordingly.
  Provides powerful alignment and distribution capabilities for responsive design.

display: grid;

  Creates a grid container for its children.
  Defines columns and rows in a layout, allowing for precise control over the placement and sizing of items.
  Grid layout is highly flexible and can adapt to various screen sizes and content structures.
  Offers powerful capabilities for creating complex and responsive layouts with ease.

display: none;

  Hides the element from the layout entirely.
  The element and its content are not rendered, and it does not take up any space in the document flow.
  Useful for hiding elements dynamically or for accessibility purposes.

display: table;

  Renders an element as a block-level table.
  Useful for creating table-like structures without using actual <table> elements.
  Similar to <table> in behavior, but allows for more flexibility in styling.

display: table-cell;

  Renders an element as a table cell inside a table-like structure.
  Useful for creating layouts that mimic table behavior, such as aligning content vertically within a row.


Display position
---------------------------------------

.el {
  position: static;
  position: relative;
  position: absolute;
  position: fixed;
  position: sticky;
  position: inherit;
}

Static:

it is the default type of positioning, these elements will stack in a standard one-after-another order.

Relative:

 - if you give position: relative it will not do anything unless you give top, bottom, right, left values
 - it doesn't effect any other static elements around it
 - it won't disturb the environment

Absolute:

 - removed from the DOM and positioned based on its nearest relatively positioned parent element. 
 - it will effect the environment
 - its like it no longer exists and the other static elements will move up to fill in the space. 
 - The position is determined by its parent elements. If all of the parent elements are either static, or there are none, then the element is positioned based on the <body>.

Fixed:

 - Fixed elements are completely independent 
 - it will always be positioned based on the browser window. 
 - when the page is scrolled, the element stays “fixed” and is always visible.
 - ex: menu bar, support center or feedback social media icons

Sticky: 

 - A sticky element toggles between relative and fixed , depending on the scroll position. 
 - It is positioned relative until a given offset position is met in the viewport - then it "sticks" in place.
 - ex: table headers, advertisement banners,

<style>
      .parent {
         width: 500px;
         height: 200px;
         overflow: auto;
         background-color: pink;
         font-size: 1.4rem;
      }
      .child {
         position: sticky;
         left: 0px;
         top: 30px;
         height: 70px;
         width: 70px;
      }
</style>

Inherit: 

the element inherits the parent's position value and sets it as its own. For example, if the parent is `position:absolute`, the child will be `position:absolute`.

border-box
------------------------------------
* { box-sizing: border-box } // Include padding and border in the element's total width and height:
  If you want to make sure that all form elements in your design have the same height, just declare box-sizing: border-box

cm - centimeters
rem (font) - root element font-size * rem val
      1.5 rem = 1.5 * browser default root font-size (or) root font-size
      1.5 rem = 1.5 * 16px 
em (font) - parent elemnt font-size * em val
      20px * 2em = 40px;
em - elements (i.e., relative to the font-size of the element; e.g., 2 em means 2 times the current font size)
in - inches
mm - millimeters
pc - picas (1 pc = 12 pt = 1/6th of an inch)
pt - points (1 pt = 1/72nd of an inch)
px - pixels (1 px = 1/96th of an inch)

block - inline - inline-block
---------------------------------------
A block element always starts on a new line, and fills up the horizontal space left and right on the web page. 

Inline elements don’t start on a new line, they appear on the same line as the content and tags beside them. Some examples of inline elements are <span> , <strong>, and <img> tags.

When it comes to margins and padding, browsers treat inline elements differently. You can add space to the left and right on an inline element, but you cannot add height to the top or bottom padding or margin of an inline element.

Inline-block elements are similar to inline elements, except they can have padding and margins added on all four sides.

Responsive web design:
------------------------
- Fluid Grid Layouts (use % rather than px)
- Flexible responsive images (should be adoptive to the view port)
- Media Queries (based on the view port width or breakpoints add the css styles)

we need to add the below meta tag not to zoom out when using small screens/phones

<meta name="viewport" content="width=device-width, initial-scale=1.0">

/* 1024 to 1200
@media only screen and (max-width: 1200px) {
}

/* 768 to 1023
@media only screen and (max-width: 1023) {
}

/* 481 to 767
@media only screen and (max-width: 767) {
}

/* 0 to 480
@media only screen and (max-width: 480) {
}

@media only screen and (orientation: landscape) {
}


center div
---------------
Transform method:

.container {
  position: relative;
}
.centered-element {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

Flexbox method:
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

CSS Grid method:
.container {
  display: grid;
  place-items: center;
}


*/