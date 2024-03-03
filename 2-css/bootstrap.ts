/*

Bootstrap is a css framework for faster and easier web development. Bootstrap includes HTML and CSS based design templates for typography, forms, buttons, tables, navigation, modals, image carousels and many other, as well as optional JavaScript plugins.

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

add the file paths to the styles and scripts array in file .angular-cli.json:

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