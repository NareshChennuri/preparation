/*

A service is a TypeScript class that's used to organize and share code and data across different components. 

Services are Singleton Objects.
only one instance of a service is created and shared among all components which will inject and use that service. 
This helps in maintaining consistent state and avoiding duplication of resources.

Services are a great way to share data between components that may not have a direct parent-child relationship. 
you can use a service to manage user authentication state, store application data, and also we can interact with APIs.

Many services are used to interact with APIs and make HTTP requests.

Services can also used for communication between components using EventEmitter.

> ng generate service service-name

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Makes the service available application-wide
})
export class MyService {
  // Service logic and properties
}


import { Component } from '@angular/core';
import { MyService } from './my-service.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
})
export class MyComponent {
  constructor(private myService: MyService) {
    // Access and use myService methods and properties
  }
}

*/