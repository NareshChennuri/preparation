/*

HTTP interceptors allows you to intercept HTTP requests and responses globally in our application. 
Interceptors provide a way to modify or handle HTTP requests and responses at a centralized location before they reach the server or client. 
This can be useful for logging requests, adding authentication headers, handling errors, or modifying request/response data. 
Interceptors can be registered in the Angular module and are executed in a specific order based on the request/response pipeline.


import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // You can modify the request before it is sent
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: 'Bearer YourAccessTokenHere'
      }
    });

    // Pass the modified request to the next interceptor or HttpHandler
    return next.handle(modifiedRequest);
  }
}

Register the interceptor in your app.module.ts:

import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth-interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}



*/