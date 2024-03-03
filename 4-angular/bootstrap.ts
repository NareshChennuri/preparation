/*

Bootstrap is a free front-end framework for faster and easier web development. Bootstrap includes HTML and CSS based design templates for typography, forms, buttons, tables, navigation, modals, image carousels and many other, as well as optional JavaScript plugins.

Bootstrap is simple to use and anyone with a basic understanding of HTML and CSS can get started.

A mobile-first strategy: Mobile-first styles are built into the Bootstrap framework.

Bootstrap's responsive CSS adapts to phones, tablets, and desktops.

Bootstrap is compatible with all modern browsers, including Chrome, Firefox, Internet Explorer 10+, Edge, Safari, and Opera.

------
What is a Bootstrap Container, and how does it work?

A bootstrap container is a handy class that generates a central region on the page where we can put our site content. The bootstrap .container has the advantage of being responsive and containing all of our other HTML code. Containers are used to pad the content within them, and there are two types of containers:

The .container class creates a fixed-width container that is responsive.
The .container-fluid class creates a full-width container that spans the entire viewport width.

--------------
What do you know about the Bootstrap Grid System?

The Bootstrap Grid System is a mobile-first, responsive grid system that scales up to 12 columns as the device or viewport size grows. Predefined classes for quick layout options and powerful mix-ins for creating successful semantic layouts are included in the system.

There are five classes in the Bootstrap 4 grid system:

.col- for extra small devices, whose screen width is less than 576px.
.col-sm- small devices, whose screen width is equal to or greater than 576px.
.col-md- medium devices, whose screen width is equal to or greater than 768px.
.col-lg- large devices, whose screen width is equal to or greater than 992px.
.col-xl- extra large devices, whose screen width is equal to or greater than 1200px.

============

installing bootstrap in angular

$ npm install bootstrap@3 jquery --save

add the file paths to the styles and scripts array in file 

.angular-cli.json:
---------------------
"styles": [
    "styles.css",
    "../node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
  "scripts": [
    "../node_modules/jquery/dist/jquery.min.js",
    "../node_modules/bootstrap/dist/js/bootstrap.min.js"
  ],
*/