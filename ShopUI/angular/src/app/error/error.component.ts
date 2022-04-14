import {AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  providers: [AuthenticationService]
})
export class ErrorComponent implements OnInit, AfterViewInit, OnDestroy {
  code!: number;
  constructor(private authenticationService: AuthenticationService) {
  }
  ngOnDestroy(): void {
    localStorage.removeItem('errorStatus');
    localStorage.setItem('errorStatus', "404");
  }
  ngAfterViewInit(): void {

  }
  
  ngOnInit(): void {
    this.code = JSON.parse(localStorage.getItem('errorStatus')!);
    /*this.authenticationService.sharedErrorCode.subscribe(errCode => {
      console.warn(errCode);
      this.code = errCode;
    });*/
  }
  
}
