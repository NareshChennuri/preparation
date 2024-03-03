/*

https://yoksel.github.io/flex-cheatsheet/

Flexible Box Layout (Flexbox):
---------------------------------------
- Flexbox is a one-dimensional layout model 
- using Flexbox we can arrange items within a container
- one-dimensional means either horizontally (row) or vertically (column).
- it provides an efficient way to distribute space among items dynamically.

Container Properties
=============================
display to flex: makes contain as flex cotainer & child elements as flex items
    - display: flex; 
    
flex-direction: place flex items as
    - row, 
    - row-reverse, 
    - column, 
    - column-reverse.

justify-content: how should the flex items are aligned along the main axis
    - flex-start, 
    - flex-end, 
    - center, 
    - space-between, 
    - space-around.

align-items:  flex items are aligned along the cross axis
    - flex-start, 
    - flex-end, 
    - center, 
    - baseline, 
    - stretch.

flex-wrap:  flex items are forced onto a single line or can wrap onto multiple
    - nowrap, 
    - wrap, 
    - wrap-reverse.

Item Properties:
==========================
flex: fill the available space 

    - flex-grow: 
        Specifies how much a flex item should grow relative to the other flex items within the same container.
    - flex-shrink: 
        Specifies how much a flex item should shrink relative to the other flex items within the same container.
    - flex-basis: 
        Sets the initial main size of a flex item before any remaining space is distributed.

Alignment and Ordering:
==========================
Flexbox allows for easy alignment of items both along the main and cross axes using properties like justify-content and align-items.

Flex items can also be reordered using the order property, allowing for flexible layouts without altering the source order in the HTML.
Responsive Design:

Flexbox is inherently responsive, making it ideal for building layouts that adapt to different screen sizes and devices.
Media queries can be combined with Flexbox to create layouts optimized for various viewport sizes.

Browser Support:

Flexbox enjoys broad support across modern browsers, including all major desktop and mobile browsers.

However, vendor prefixes might be required for older versions of some browsers.
Flexbox simplifies the process of creating complex layouts, offering more control over alignment, distribution, and order of elements within a container, ultimately leading to more efficient and responsive designs.

display: 
---------
flex
inline-flex

ordering & orientation
---------------------------
flex-direction: row, row-reverse, column, column-reverse
flex-wrap: nowrap, wrap, wrap-reverse
flex-flow: wrap, no-wrap
order: -1/0/1

alignment
----------
justify-content: flex-start, flex-end, center, space-between, space-around, space-evenly
//based on cross axis
align-items: stretch, flex-start, flex-end, center, baseline, auto
align-self: auto, stretch, flex-start, flex-end, center, baseline
alint-content: flex-start, flex-end, center, space-between, space-around, stretch

flexibility
------------
flex-grow: 0/1; (no negative numbers)
flex-basis: 30%, 50%, content, auto
*/