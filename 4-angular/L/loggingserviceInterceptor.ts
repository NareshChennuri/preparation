/*
Injectable Logging Service:

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  log(message: string) {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }
}

HTTP Interceptor:

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor(private loggingService: LoggingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loggingService.log(`Outgoing request: ${req.method} ${req.url}`);

    return next.handle(req).pipe(
      tap(
        event => this.loggingService.log(`Incoming response: ${event.status} ${event.statusText}`),
        error => this.loggingService.log(`Error: ${error.message}`)
      )
    );
  }

}

Explanation:

The LoggingService is a simple service that provides a log() method for logging messages.
The LoggingInterceptor implements the HttpInterceptor interface.
The intercept() method of the LoggingInterceptor is called for every HTTP request and response.
The intercept() method logs the following information:
The outgoing request method and URL.
The incoming response status and status text.
Any errors that occur.

Adding the Interceptor to the HTTP Client:

To add the LoggingInterceptor to the HTTP client, you need to add it to the providers array in your app.module.ts file.

providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoggingInterceptor,
    multi: true
  }
]

Note:

The multi: true property tells Angular that the LoggingInterceptor should be added to the existing list of HTTP interceptors.
This allows you to have multiple HTTP interceptors in your application.

*/