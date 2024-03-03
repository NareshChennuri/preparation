/*

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