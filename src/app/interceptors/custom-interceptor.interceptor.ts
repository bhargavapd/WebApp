import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable,map } from 'rxjs';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestCopy=request.clone();
    requestCopy.headers.set("my-custom-header","my-custom-data");
    console.log("intercepted request",request);
    return next.handle(requestCopy).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
          console.log('intercepted response',event);
          event = event.clone();
      }
      return event;
  }));
  }
}
