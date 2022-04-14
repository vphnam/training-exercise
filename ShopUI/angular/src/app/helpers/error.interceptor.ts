import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ErrorPageModel } from '../services/interface/interface.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router:Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            this.authenticationService.nextErrorCode("ERROR " + err.status);
            localStorage.setItem('errorStatus', err.status);
            this.router.navigate(['/error']);
            /*if (err.status === 401 || err.status === 403) {
                this.authenticationService.errorCode.next(err.status);
                this.router.navigate(['/error']);
            }
            else if (err.status < 200 || err.status > 299) {
                this.router.navigate(['/error']);
            }
            */
            const error = err.error || err.statusText;
            return throwError("haha");
        }))
    }
}