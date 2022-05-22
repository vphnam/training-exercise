import {AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  providers: [AuthenticationService]
})
export class ErrorComponent implements OnInit, AfterViewInit, OnDestroy {
  code!: string;
  constructor(private authenticationService: AuthenticationService) {
  }
  ngOnDestroy(): void {
  }
  ngAfterViewInit(): void {

  }
  
  ngOnInit(): void {
    this.code = this.authenticationService.currentErrorCode;
    localStorage.removeItem('errorStatus');
    localStorage.setItem('errorStatus', "404");
    /*this.authenticationService.sharedErrorCode.subscribe(errCode => {
      console.warn(errCode);
      this.code = errCode;
    });*/
  }
  
}
