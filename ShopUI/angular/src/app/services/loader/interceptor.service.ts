import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, EMPTY, finalize, Observable, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(public loaderService: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);
    return next.handle(req).pipe(
      /*tap(evt => {
        if(evt instanceof HttpResponse){
          console.warn("done but?");
          this.loaderService.isLoading.next(false);
        }
      })*/
      finalize(() =>{
        this.loaderService.isLoading.next(false);
      }),
    );
    
  }
}
  
  /*intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      finalize(() =>{
          this.loaderService.isLoading.next(false);
        }),
    );
  }
  
}*/
