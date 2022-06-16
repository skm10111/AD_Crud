import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer  ${currentUser.token}`,
        },
      });
    }
    return next.handle(request);
  }
}
