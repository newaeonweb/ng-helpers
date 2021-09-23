import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { finalize, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../services/loader.service';
import { Logger } from '../services/logger.service';

const log = new Logger('api Interceptor');

@Injectable({
  providedIn: 'root'
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();
    log.info('Added new headers to every request');
    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({
        url: environment.apiURL + request.url,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Api-Key': environment.myKey
        })
      });
    }
    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
}
