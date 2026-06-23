import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const authService = inject(AuthService);

  const localDate = new Date().toLocaleDateString('en-CA');
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  
  const headers: { [key: string]: string } = {
    'X-Local-Date': localDate,
    'X-Timezone': timezone
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const cloned = req.clone({
    setHeaders: headers
  });

  return next(cloned).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};

