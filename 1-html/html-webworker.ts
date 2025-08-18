/**
 * 

HTML5 introduced new semantic elements like 
<header>, <footer>, <nav>, <article>, <section>, and more. 

These elements provide a clearer structure to web documents, making it easier for developers to convey the meaning of different parts of a page.

Improves the Accessibility and ADA guidelines
Improves with SEO

<header>
  <h1>Website Title</h1>
</header>
<nav>
  <!-- Navigation links -->
</nav>
<section>
  <article>
    <!-- Article content -->
  </article>
  <aside>
    <!-- Sidebar content -->
  </aside>
</section>
<footer>
  <!-- Footer content -->
</footer>
Audio and Video Support:

HTML5 includes native support for embedding audio and video content using the <audio> and <video> elements, eliminating the need for third-party plugins like Flash.

<audio controls>
  <source src="audio.mp3" type="audio/mp3">
  Your browser does not support the audio element.
</audio>

<video width="320" height="240" controls>
  <source src="video.mp4" type="video/mp4">
  Your browser does not support the video element.
</video>
Canvas Element:

The <canvas> element allows developers to draw graphics, animations, and interactive content dynamically using JavaScript. It provides a versatile platform for creating visual elements without the need for plugins.

<canvas id="myCanvas" width="200" height="100"></canvas>
Local Storage and Session Storage:

HTML5 introduces the localStorage and sessionStorage APIs, enabling web applications to store data locally on the user's device. This allows for persistent storage of information between sessions.

// Local Storage
localStorage.setItem('key', 'value');
console.log(localStorage.getItem('key'));
Responsive Design with <meta> Tags:

HTML5 supports responsive design through the use of meta tags. The <meta> tags, such as <meta name="viewport">, allow developers to control the viewport settings, making web pages more adaptable to different screen sizes and devices.

<meta name="viewport" content="width=device-width, initial-scale=1.0">
Form Enhancements:

HTML5 introduces new input types, attributes, and validation features for forms. These include input types like date, email, number, and attributes like required, providing a better user experience and reducing the need for JavaScript-based validation.

<input type="email" required>
Web Workers:

HTML5 introduces web workers, allowing developers to run scripts in the background without affecting the performance of the main application. This enables concurrent processing and improved performance for complex web applications.

// Creating a web worker
var worker = new Worker('myWorker.js');
Geolocation API:

HTML5 provides the Geolocation API, allowing web applications to access the user's geographical location. This is useful for location-based services and mapping applications.

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);



web Worker
==============

// Creating a web worker
var primeWorker = new Worker('primeWorker.js');

// Listening for messages from the worker
primeWorker.onmessage = function (e) {
  console.log('Prime numbers: ', e.data);
};

// Sending a message to the worker to start calculations
primeWorker.postMessage({ start: 1, end: 1000 });

> primeWorker.js
-------------------
// Listening for messages from the main thread
self.onmessage = function (e) {
  var start = e.data.start;
  var end = e.data.end;

  // Function to check if a number is prime
  function isPrime(num) {
    for (var i = 2; i < num; i++)
      if (num % i === 0) return false;
    return num !== 1;
  }

  // Calculating prime numbers in the given range
  var primes = [];
  for (var i = start; i <= end; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  // Sending the result back to the main thread
  self.postMessage(primes);
};
*/