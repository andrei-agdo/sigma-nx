import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = req.headers.set('Content-Type', 'application/json');

    // if (localStorage && localStorage.getItem('token') && req.url.includes(environment.api))
    //   headers = req.headers.set(
    //     'Authorization',
    //     'Bearer ' + localStorage.getItem('token')
    //   );

    const duplicate = req.clone({ headers: headers });

    return next.handle(duplicate).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.status === 401) {
          this.router.navigate(['/login']);
        }

        if (!e.error?.errors || e.error?.errors?.length === 0)
          throw (e);

        const joinedMessage = e.error.errors
          .map((error: any) => error.message)
          .join(' ');

        throw new Error(joinedMessage);
      })
    );
  }
}
