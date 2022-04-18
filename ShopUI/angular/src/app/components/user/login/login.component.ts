import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RaiseAlertService } from 'src/app/services/raise-alert/raise-alert.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private shared: SharedService, private router: Router, 
    private actRouter: ActivatedRoute, 
    private authenticationService: AuthenticationService,
    private raiseAlertService: RaiseAlertService) { 
    const sessionUser = JSON.parse(localStorage.getItem('currentUser')!);
    if(this.authenticationService.currentUserValue == null && sessionUser != null)
    {
      this.loginForm.controls['userName'].patchValue(sessionUser.userName);
      this.loginForm.controls['passWord'].patchValue(sessionUser.passWord);
      this.authenticationService.login(this.loginForm.value);
    }
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/']);
    }
  }
  ngOnDestroy(): void {
  }
  returnUrl!: string;
  invalidLogin!: boolean;
  loginForm = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    passWord: new FormControl(null, [Validators.required]),
  });
  token!: string;
  ngOnInit(): void {
    this.returnUrl = this.actRouter.snapshot.queryParams['returnUrl'] || '/';
  }
  logIn(){
    this.authenticationService.login(this.loginForm.value)
            .pipe()
            .subscribe(
                data => {
                  if(data.status == 200)
                  {
                      this.router.navigate([this.returnUrl]);
                  }
                  else if(data.status == 500)
                  {
                    this.loginForm.controls['userName'].setValue('');
                    this.loginForm.controls['passWord'].setValue('');
                    this.raiseAlertService.raiseAlert("error", "Error","Invalid username or password. Please try again!");
                  }
                },
                error => {
                  this.raiseAlertService.raiseAlert("error","Error","Error request!");
                });
  }
}
