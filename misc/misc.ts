import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoggingService } from './logging.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private baseUrl = environment.apiUrl; // Define API URL in environment files

  constructor(
    private http: HttpClient,
    private loggingService: LoggingService,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders(), params })
      .pipe(
        map((response) => response),
        catchError((error) => this.handleError(error))
      );
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${endpoint}`, body, { headers: this.getHeaders() })
      .pipe(
        map((response) => response),
        catchError((error) => this.handleError(error))
      );
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}/${endpoint}`, body, { headers: this.getHeaders() })
      .pipe(
        map((response) => response),
        catchError((error) => this.handleError(error))
      );
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders() })
      .pipe(
        map((response) => response),
        catchError((error) => this.handleError(error))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }

    // Log error
    this.loggingService.logError(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
