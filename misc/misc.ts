<div class="error-container">
  <h2>Oops! Something went wrong.</h2>
  <p>The server encountered an internal error and was unable to complete your request. Please try again.</p>
  <p>
    For further assistance, please contact the Scrum Academy Team at
    <a href="mailto:dg.eet_innovation_lab_academy_scrum@bofa.com?subject=Internal Server Error Report">
      dg.eet_innovation_lab_academy_scrum@bofa.com
    </a>.
  </p>
</div>



export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          this.router.navigate(['/internal-server-error']);
        }
        return throwError(() => error);
      })
    );
  }
}