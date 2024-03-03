/*

Authentication Interceptor
Error Handling Interceptor
Logging Interceptor
Caching Interceptor
Headers Interceptor
Loading Indicator Interceptor
Timeout Interceptor
Base URL Interceptor
Retry Interceptor
Offline Mode Interceptor
JWT Refresh Token Interceptor
Request Timing Interceptor
Localization Interceptor
Content Security Policy (CSP) Interceptor
Compression Interceptor

1. Authentication Interceptor

An authentication interceptor is used to add authentication tokens to outgoing requests and handle authentication-related errors. This is essential for securing your application’s API requests.

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = 'your-auth-token';
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`),
    });
    return next.handle(authRequest);
  }
}
2. Error Handling Interceptor
An error handling interceptor can be used to centralize error handling for HTTP requests. It can capture HTTP errors, log them, and perform appropriate actions like displaying error messages.

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle and log the error here
        console.error('HTTP Error:', error);
        // Optionally rethrow the error to propagate it
        return throwError(error);
      })
    );
  }
}
3. Logging Interceptor
A logging interceptor can be used to log the details of HTTP requests and responses, which is helpful for debugging and monitoring.

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log('HTTP Response:', event);
        }
      })
    );
  }
}
4. Caching Interceptor
A caching interceptor can be used to implement client-side caching for HTTP responses, reducing the number of unnecessary network requests.

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedResponse = this.cache.get(request.url);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cache.set(request.url, event);
        }
      })
    );
  }
}
5. Headers Interceptor
A headers interceptor can be used to add custom headers to outgoing HTTP requests. This is often used to set headers like ‘Content-Type’ or include API keys.

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': 'your-api-key',
    });
    const headersRequest = request.clone({ headers });
    return next.handle(headersRequest);
  }
}
6. Loading Indicator Interceptor
A loading indicator interceptor can be used to show and hide loading spinners or progress bars during HTTP requests, providing a better user experience.

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { LoadingService } from './loading.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.loadingService.showLoading();
    return next.handle(request).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }
}
7. Timeout Interceptor
A timeout interceptor can be used to set a maximum timeout for HTTP requests. It can be useful to prevent long-running requests from blocking your application.

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { throwError, timer, Observable } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const timeoutDuration = 10000; // 10 seconds
    return next.handle(request).pipe(
      timeout(timeoutDuration),
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          // Handle timeout error here
          console.error('Request timed out:', request.url);
          return throwError('Request timed out');
        }
        return throwError(error);
      })
    );
  }
}
8. Base URL Interceptor
A base URL interceptor can be used to prepend a base URL to all HTTP requests, simplifying the configuration of API endpoints.

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private baseUrl = 'https://api.example.com';

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const apiRequest = request.clone({
      url: `${this.baseUrl}${request.url}`,
    });
    return next.handle(apiRequest);
  }
}
9. Retry Interceptor
A retry interceptor can be used to automatically retry failed HTTP requests, which can be helpful in handling intermittent network issues.

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Define the maximum number of retries
    const maxRetries = 3;
    return next.handle(request).pipe(retry(maxRetries));
  }
}
10. Offline Mode Interceptor
An offline mode interceptor can be used to detect when the user’s device is offline and handle HTTP requests accordingly, such as storing them for later or showing a friendly message.

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OfflineModeInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Check if the device is offline
    if (!navigator.onLine) {
      // Handle offline mode (e.g., store requests for later)
      console.error('Device is offline. Request not sent:', request.url);
      return throwError(new HttpErrorResponse({ status: 0, statusText: 'Offline' }));
    }

    return next.handle(request);
  }
}
11. JWT Refresh Token Interceptor
A JWT refresh token interceptor can be used to automatically refresh expired JSON Web Tokens (JWTs) and seamlessly continue making authenticated requests.

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class JwtRefreshInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error && error.error.message === 'Token expired') {
          // Token expired; attempt to refresh it
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              // Retry the original request with the new token
              const updatedRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.authService.getAccessToken()}`,
                },
              });
              return next.handle(updatedRequest);
            }),
            catchError(() => {
              // Refresh token failed; log out the user or handle the error
              // For example, you can redirect to the login page
              this.authService.logout();
              return throwError('Token refresh failed');
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
12. Request Timing Interceptor
A request timing interceptor can be used to measure and log the time taken for each HTTP request, helping you identify performance bottlenecks.

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestTimingInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const startTime = Date.now();
    return next.handle(request).pipe(
      tap(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(`Request to ${request.url} took ${duration}ms`);
      })
    );
  }
}
13. Localization Interceptor
A localization interceptor can be used to automatically include the user’s preferred language or locale in HTTP requests, ensuring that the server sends responses in the appropriate language.

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { LocaleService } from './locale.service';

@Injectable()
export class LocalizationInterceptor implements HttpInterceptor {
  constructor(private localeService: LocaleService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const userLocale = this.localeService.getUserLocale();
    const localizedRequest = request.clone({
      setHeaders: {
        'Accept-Language': userLocale,
      },
    });
    return next.handle(localizedRequest);
  }
}
14. Content Security Policy (CSP) Interceptor
A CSP interceptor can be used to automatically add Content Security Policy headers to outgoing HTTP requests to improve security.

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable()
export class CspInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const cspHeader = "default-src 'self'; script-src 'self' 'unsafe-inline'";
    const cspRequest = request.clone({
      setHeaders: {
        'Content-Security-Policy': cspHeader,
      },
    });
    return next.handle(cspRequest);
  }
}
15. Compression Interceptor
A compression interceptor can be used to automatically request compressed content (e.g., gzip) from the server, reducing the amount of data transferred over the network.

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable()
export class CompressionInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const compressedRequest = request.clone({
      setHeaders: {
        'Accept-Encoding': 'gzip, deflate',
      },
    });
    return next.handle(compressedRequest);
  }
}
Using Interceptors in Angular
To use interceptors in your Angular application, you need to provide them in your app’s root module. Here’s an example of how to do this:

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import { HeadersInterceptor } from './headers.interceptor';
import { LoadingInterceptor } from './loading.interceptor';
import { TimeoutInterceptor } from './timeout.interceptor';
import { BaseUrlInterceptor } from './base-url.interceptor';
import { RetryInterceptor } from './retry.interceptor';
import { OfflineModeInterceptor } from './offline-mode.interceptor';
import { JwtRefreshInterceptor } from './jwt-refresh.interceptor';
import { RequestTimingInterceptor } from './request-timing.interceptor';
import { LocalizationInterceptor } from './localization.interceptor';
import { CspInterceptor } from './csp.interceptor';
import { CompressionInterceptor } from './compression.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: OfflineModeInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtRefreshInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestTimingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LocalizationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CspInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CompressionInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
In this example, we’ve provided multiple interceptors using the HTTP_INTERCEPTORS token, and Angular will apply them in the order they are provided.

*/