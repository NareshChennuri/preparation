/*
Good code
=================
- Readability 
    easy to read and understand
    consistent naming convetions
    meaningful variable and function names
- Modularity
    components with clear responsibilities
    need to keep in mind for separation of concerns
- Maintainability
    easy to maintain and modify
    well documented for complex logic
- Efficiency
    in terms of time and space complexity
    avoid duplication 
    optimize performance where needed
- Scalability
    it should accomodate growth & complexity
    without need of refactoring
    should write code with flexibility in mind
    
Bad Code
=============
- Spaghetti code
- Poor naming conventions
- Hard coded values
- Lack of documentation
- inefficient algorithms
- Ignored best practices



How to fix bad code
============================
- Identify issues
- Refactor code 
    Breakdown large functions or classes
    into smaller manageable units
    apply design patterns and principles like
    SOLID (flexible, reusable, sustainable, understandable)
    DRY (Don't Repeat Yourself)
    KISS (Keep it simple, stupid)
- Improving naming conventions
- Address perfomance issues
- Monitor and analyze  with help of
    code quality analyzers
    performance profilers
    monitoring systems

    analyze code for potential bugs, security vulnerabilities and code smells.    
    use tools like Eslint, JSHint, SonarQube, checkMarx


code optimization
======================
- use efficient algorithms and data structures
- minimize DOM manipulation
- avoid global variables
- optimize loops 
    avoid nested loops
- reduce Object Property Access
- Debounce and Throttle event handlers
    to limit the frequency of event handler execution
- Lazy loading and code splitting
- Minify & bundle code
- optimize images & assets
- use web workers
- cache data 
- monitor and test        




Git PreCommit hooks - husky
==========================

npm install husky --save-dev
npm install prettier --save-dev
npm install tslint-config-prettier --save-dev

"husky": {
  "hooks": {
    "pre-commit": "npm run prettier --staged && ng lint && npm test",
    "pre-push": "ng build --aot true"
  }
}    

*/