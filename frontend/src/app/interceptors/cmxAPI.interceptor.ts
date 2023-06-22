import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import { SessionService } from '../services/session.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class CmxAPIInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(private sessionService: SessionService) {}
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    httpRequest = this.addHeadersAtOnce(httpRequest);
    return next.handle(httpRequest).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !httpRequest.url.includes("token")
        ) {
          
          //   return this.handle401Error(request, next);
          if (this.refreshTokenInProgress) {
            return this.refreshTokenSubject.pipe(
              filter((result) => !!result),
              take(1),
              switchMap((result: any) => {
                console.log("intercept error");
                return next.handle(this.addHeadersAtOnce(httpRequest));
              })
            );
          } else {
            this.refreshTokenInProgress = true;
            // cleaning the stream
            this.refreshTokenSubject.next(null);
            return this.sessionService.refreshToken().pipe(
              switchMap((values) => {
                this.refreshTokenInProgress = false;
                this.refreshTokenSubject.next(values.access_token);
                console.log("intercept ok");
                return next.handle(this.addHeadersAtOnce(httpRequest));
              })
            );
          }
        } else {
          console.log("intercept LL");
          return throwError(() => error);
        }
      })
    );
  }

  /**
   * Add all the headers in one step
   * @param request
   */
  private addHeadersAtOnce(request: HttpRequest<any>): HttpRequest<any> {
    let clone = request.clone();
    clone = this.addBearer(clone);
    clone = this.addJWT(clone);
    clone = this.addClientId(clone);
    clone = this.addAppCode(clone);
    return clone;
  }

  private addBearer(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    if (!localStorage.getItem("bearer")) {
      return request;
    }
    // If you are calling an outside domain then do not add the token.
    const reg = new RegExp(`${environment.host}/`);
    if (!request.url.match(reg)) {
      return request;
    }
    return request.clone({
      headers: request.headers.set(
        "Authorization",
        `Bearer ${localStorage.getItem("bearer")}`
      ),
    });
  }
  private addJWT(request: HttpRequest<any>): HttpRequest<any> {
    if (!localStorage.getItem("jwt")) {
      return request;
    }
    // If you are calling an outside domain then do not add the token.
    const reg = new RegExp(`${environment.host}/`);
    if (!request.url.match(reg)) {
      return request;
    }
    return request.clone({
      headers: request.headers.set("jwt", localStorage.getItem("jwt")),
    });
  }
  private addClientId(request: HttpRequest<any>): HttpRequest<any> {
    // If you are calling an outside domain then do not add the token.
    const reg = new RegExp(`${environment.host}/`);
    if (!request.url.match(reg)) {
      return request;
    }
    return request.clone({
      headers: request.headers.set(
        "x-ibm-client-id",
        "ba4ae518-258b-4b29-9d6f-8d77ab1cef7a"
      ),
    });
  }
  private addAppCode(request: HttpRequest<any>): HttpRequest<any> {
    // If you are calling an outside domain then do not add the token.
    const reg = new RegExp(`${environment.host}/`);
    if (!request.url.match(reg)) {
      return request;
    }
    return request.clone({
      headers: request.headers.set("App-Code", "Foreman_App"),
    });
  }
}
