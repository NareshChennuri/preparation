/*

> npm install -g create-react-app
> create-react-app helloworld
> cd helloworld
> npm start

index.js file is the entry point of our code
----------------------------------------------

JSX syntax

const tasks = ['one','two','three'];
const element = <ol> { tasks.map(task) => <li> {task} </li> } </ol>;
ReactDOM.render(element, document.getElementById('root'));

Life Cycle methods
--------------------------
constructor() : 
- called before component is mounted. NEVER put side effect code inside of the constructor. Use ComponentDidMount for that instead. Commonly used to initialize state or bind methods. 

componentWillMount(): 
- invoked immediately before mounting occurs. Called before render. Once again, DO NOT put any side effect code inside of componentWillMount, and do not make API calls in this method  

render(): 
- never fetch data inside of render. Should only be used to return elements.

componentDidMount(): 
- Perfect place to fetch data. It gets called after render. This makes it clear that the initial state is empty at first, until we fetch it and re-trigger render. This forces us to set up our initial state properly, otherwise you're likely to get undefined states.

componentDidUpdate(): //called when comp re-rendered to the dom
- called when the state of a component changes. Perfect place to update UI or make network calls based on previous state before update, and current state






*/