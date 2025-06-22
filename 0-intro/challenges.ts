/**
 * 

Challenge 1: Handling Performance in a Large Angular App
Challenge 2: Accessibility Compliance (WCAG)
Challenge 3: Syncing Onshore-Offshore Teams
Challenge 4: Bridging the Gap Between UX and Dev



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


🛠️ The Problem:
Our web app had a feature that logged users out after 2 minutes of inactivity. Everything looked fine at first — we had a worker or background thread watching for user actions like mouse moves and key presses. Every time the user interacted, the timer reset.

But we started getting real user complaints — people were getting logged out while actively using the app, often right after completing a major task. Our logs backed them up. We ran tests locally, reproduced it with shorter timers — and everything seemed fine.

So what was happening?

🔍 The Investigation:
We found that the issue occurred after users clicked the Refresh button in the app — a feature that reloads app data, resets caches, and restarts polling logic. This refresh re-initialized the monitoring thread that tracks user activity.

That’s when the lightbulb went off 💡:
The old activity-monitoring thread wasn't getting cleaned up.

So every time the user hit Refresh, a new activity watcher started. But the old one kept running in the background — and since it no longer had access to UI events, it thought the user was idle. After two minutes, it would trigger a logout — even though the new watcher was properly tracking activity.

✅ The Fix:
We fixed it by ensuring that the old inactivity tracking thread was terminated before starting a new one. Here's how we cleaned it up:


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

---------------

// Updated version
let inactivityWorker: Worker | null = null;

function startInactivityWatcher() {
  // Terminate the existing worker if present
  if (inactivityWorker) {
    inactivityWorker.terminate();
  }

  inactivityWorker = new Worker(new URL('./inactivity-worker.js', import.meta.url));

  inactivityWorker.postMessage({ startTimer: true });

  // Forward user events to the worker
  addEventListener('mousemove', () => {
    inactivityWorker?.postMessage({ activity: true });
  });

  addEventListener('keydown', () => {
    inactivityWorker?.postMessage({ activity: true });
  });
}

// Call this on startup and whenever Refresh is triggered
startInactivityWatcher();



📌 Summary:
The bug wasn’t in the timer logic — it was in spawning multiple listeners without killing the old one. Once we added proper cleanup (terminating the old worker before starting a new one), users stopped getting logged out randomly.

It was a great reminder that "restart logic" should include cleanup, especially in environments that use long-running listeners or workers.

Let me know if you want this turned into a slide, case study, or code snippet breakdown.


*/