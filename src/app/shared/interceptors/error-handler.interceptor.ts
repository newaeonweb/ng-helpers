import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Logger } from '../services/logger.service';
import { environment } from 'src/environments/environment';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!environment.production) {
          // Log available on dev mode
          log.error('Request error', error);
        }
        if (error.error instanceof ErrorEvent) {
          log.info('this is client side error');
          log.debug(`Error: ${error.error.message}`)
        } 
        return throwError(this.getServerErrorMessage(error));       
      })
    );
  }

  //  Avoid to pass the real errors to client
  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400: {
        return `Bad Request: put your message here`;
      }
      case 401: {
        return `Unauthorized: put your message here`;
      }
      case 403: {
        return `Forbidden: put your message here`;
      }
      case 404: {
        return `Not Found: put your message here`;
      }
      case 422: {
        return `Unprocessable Entity: put your message here`;
      }
      case 500: {
        return `Internal Server Error: put your message here`;
      }
      default: {
        return `Unknown Server Error: put your message here`;
      }
    }
  }
}
