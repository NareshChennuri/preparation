/*


Ivy is always the rendering engine in modern Angular (since v9+).

How templates are compiled (JIT or AOT) depends on whether you’re in development or production—but Ivy is always the one doing the rendering.


“Ivy is Angular’s new rendering engine that makes apps smaller and faster.
Angular can compile templates using JIT (in the browser, good for development) or AOT (during build, good for production).
With AOT, the app loads faster because everything’s already compiled. With JIT, builds are quicker during development but users wait longer on first load.
Ivy works with both and brings major performance and debugging improvements.”


Use JIT during development for faster rebuilds.

Use AOT + Ivy for production builds for better performance and security.


Feature         Ivy (Rendering Engine)  AOT & JIT (Compilers)
-------------------------------------------------------
Compilation     Ahead-of-time (AOT)     Ahead-of-time (AOT) or Just-in-time (JIT)
Speed           Faster                  Faster than JIT, slower than Ivy
Bundle size     Smaller                 Smaller than JIT, larger than Ivy
Debugging       Improved                Improved
Testing         Enhanced                Enhanced


### The Ahead-of-time (AOT) compiler 

converts the Angular HTML and TypeScript code into JavaScript code during the build phase, 
- Faster rendering
- Fewer asynchronous requests
- Smaller Angular framework download size
- Quick detection of template errors
- Better security
- used in build time
> ng build --aot

#### The Just-in-Time (JIT) compilation 
- development phase
- slower compare to AOT
It is also known as dynamic compilation. 

IVY runtime engine

- faster compilation, 
- smaller bundle size, 
- improved performance
- template type checking
- Major advantage is it only recompiles the parts of the application that have changed
- it makes efficient Change Detection and Rendering of the angular application




*/