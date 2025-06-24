/*

Bootstrap is a front-end framework that provides prebuilt CSS and JavaScript components for building responsive, mobile-first websites. 
It speeds up development by giving you a standard set of UI tools—like buttons, forms, and grids—so you don’t have to start from scratch. 
It’s widely used for both prototyping and production websites.

Feature/Change	          Bootstrap 3               Bootstrap 4                   Bootstrap 5
CSS Preprocessor	        Less	                    Sass	                        Sass
Grid System	              4-tier (xs, sm, md, lg)	  5-tier (xs, sm, md, lg, xl)	  6-tier (xs, sm, md, lg, xl, xxl)
Flexbox	                  No (uses floats)	        Yes (flexbox default)	        Yes (improved flex utilities)
jQuery Dependency	        Yes	                      Yes	                          No (rewritten js components in vanilla js)
Custom Forms	            Basic browser styles	    Custom form controls	        Enhanced, more utility classes
Card Component	          No (use panels/wells)	    Yes (new .card component)	    Yes
Utility Classes	          Basic	                    Many added (spacing, flex)	  Even more (gap, text, etc.)
Dropdowns, Tooltips	      jQuery-based	            jQuery-based	                Pure JS (no jQuery)
Icons	                    Glyphicons included	      No icons included             No icons included
IE Support	              IE8+	                    IE10+	                        IE11 dropped
Responsive Font Sizes	    No	                      No	                          Yes (rfs enabled by default)
RTL Support	              No	                      No	                          Yes (official right-to-left)
Utility API	              No	                      No	                          Yes (custom utility generation)
Custom Properties	        No	                      Partial (some variables)	    CSS Variables (custom properties)



Utility Classes
-----------------------
Spacing     mt-2, mb-4, p-3
Display	    d-none, d-flex
Text	      text-center, text-primary
Background	bg-dark, bg-info
Sizing	    w-50, h-100
Borders	    border, rounded
Flexbox	    d-flex, align-items-center
Shadows	    shadow-lg
Visibility	visible, invisible
Float	      float-end


Bootstrap is a css framework 
- for faster and easier web development
- includes HTML and CSS based design templates 
- for typography, forms, buttons, tables, navigation, modals, image carousels 
- and many other, as well as optional JavaScript plugins.

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

> angular-cli.json:

"styles": [
    "styles.css",
    "../node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
  "scripts": [
    "../node_modules/jquery/dist/jquery.min.js",
    "../node_modules/bootstrap/dist/js/bootstrap.min.js"
  ],



  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bootstrap Grid Layout Example</title>
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <style>
    /* Custom styles 
    .box {
      border: 1px solid #ccc;
      padding: 20px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="box">
          Box 1
        </div>
      </div>
      <div class="col-md-4">
        <div class="box">
          Box 2
        </div>
      </div>
      <div class="col-md-4">
        <div class="box">
          Box 3
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="box">
          Box 4
        </div>
      </div>
      <div class="col-md-6">
        <div class="box">
          Box 5
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap JS (optional) -->
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
In this example:

The .container class creates a responsive fixed-width container.
The .row class creates a horizontal row to contain columns.
Each column is defined using the .col-md-* class, where md denotes medium-sized screens and * represents the number of columns the content should span.
Inside each column, there's a .box div to demonstrate content.
This layout will adapt to different screen sizes, with the number of columns per row adjusting accordingly.









*/