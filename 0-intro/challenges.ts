/**
 * 

In my 13 years of experience, I've encountered a variety of challenges that are common in web development.

especially when it comes to the performance and the loading times of the application;

once I was assigned with optimizing and performance tuning of data-intensive web application that experienced significant lag and slow rendering times. 
The application was designed to display large datasets, and users were facing delays when interacting with the UI, especially on lower-end devices.

Steps Taken:

Performance Profiling:

Conducted thorough performance profiling using browser developer tools to identify bottlenecks in terms of CPU usage, memory consumption, and network requests.
Code Splitting:

Implemented code splitting to load only the necessary JavaScript code for specific routes or components, reducing the initial payload size and improving initial page load times.
Lazy Loading:

Applied lazy loading for non-essential components and resources. This deferred the loading of certain features until they were required, enhancing the perceived performance for users.
Optimizing Data Rendering:

Implemented virtual scrolling and optimized data rendering techniques to efficiently handle large datasets without compromising user experience. This involved implementing pagination and loading only the visible data.
Caching Strategies:

Implemented caching strategies for frequently accessed data to reduce redundant server requests. Leveraged browser caching and explored the use of service workers for offline capabilities.
Image Optimization:

Employed image optimization techniques, such as lazy loading images and serving responsive images based on device characteristics, to reduce the impact on page loading times.
Performance Monitoring:

Integrated performance monitoring tools to continuously track and analyze application performance in real-time. This allowed for proactive identification of performance issues and rapid response to any regressions.
Results:

The optimizations led to a significant improvement in the application's performance metrics, including reduced initial load times, smoother interactions, and a more responsive user interface.

User feedback indicated a substantial improvement in the overall experience, particularly for users with slower internet connections or less powerful devices.

By addressing these performance challenges, the front-end UI lead was able to enhance the application's efficiency, ensuring a better user experience and higher satisfaction among users interacting with the data-intensive web application.


====================


We have web application and it has a feature that logs users out after liek 2 minutes of inactivity. It logs when the last activity was detected and then when it kicks them out. Well, we noticed people complaining they were being booted out on the middle of their work. Sure enough, logs showed users completing sales moments before being logged out.

We spent hours reviewing the code. On the surface it looked simple; at startup, we spawned a separate thread that watched the UI thread for activity. If the mouse was moved, clicked, or a key pressed, a timer would just reboot. As long as that timer never reached the configurable limit in minutes, you’d never be booted. We tried it locally, too, setting the timeout to two minutes and seeing that we weren’t getting logged out.

So what was going on? Why were the users reporting it? Why was the data showing they were kicked out? We spent two release cycles trying to figure this out with no success. Finally, one day, one of us clicked the Refresh button.

You see, this app cached a lot of data locally. We feature a refresh button that resets singletons so they reload, and restarts all processes and pollers so the users can get the latest data. This lets users pick up widespread system changes that are normally cached without having to restart. Well, how does that tie into our problem?

The refresh would spawn a new thread to monitor activity - but what about the old one? It was never shut down. That’s right, it kept chugging along, waiting for activity it no longer had access to because that tracking had moved to the new thread. Once that old thread hit the limit, you’d be kicked.

That was a fun one to track down.


onmessage = (event) => {
  const inactivityService = new InactivityService();
  inactivityService.startTimer();

  addEventListener('mousemove', () => {
    inactivityService.resetTimer();
  });

  addEventListener('keydown', () => {
    inactivityService.resetTimer();
  });
};

const worker = new Worker(new URL('./inactivity-worker.js', import.meta.url));

worker.postMessage({ startTimer: true });
*/