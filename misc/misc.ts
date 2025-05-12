global-error-handler.ts
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'; // Optional for toast messages

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const snackBar = this.injector.get(MatSnackBar);

    if (error instanceof HttpErrorResponse) {
      // Server or connection error
      if (!navigator.onLine) {
        snackBar.open('No Internet Connection', 'Close', { duration: 5000 });
      } else {
        const message = this.getServerErrorMessage(error);
        snackBar.open(message, 'Close', { duration: 5000 });
      }
    } else {
      // Client-side error
      console.error('Client Error:', error);
      snackBar.open('An unexpected error occurred', 'Close', { duration: 5000 });
    }

    // Optional: Log the error to backend
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return error.error?.message || 'Bad Request';
      case 401:
        return 'Unauthorized - Please login';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Not Found';
      case 500:
        return 'Internal Server Error';
      default:
        return error.message || 'Something went wrong';
    }
  }
}



import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './global-error-handler';

@NgModule({
  // ...
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ]
})
export class AppModule { }


import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = this.getErrorMessage(error);
        this.snackBar.open(message, 'Close', { duration: 5000 });
        return throwError(() => error);
      })
    );
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error?.message) return error.error.message;
    switch (error.status) {
      case 0:
        return 'No connection. Check Internet.';
      case 400:
        return 'Bad Request';
      case 401:
        return 'Unauthorized';
      case 404:
        return 'Not Found';
      case 500:
        return 'Internal Server Error';
      default:
        return 'Unexpected Error';
    }
  }
}


app.module.ts:

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';

providers: [
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
]
