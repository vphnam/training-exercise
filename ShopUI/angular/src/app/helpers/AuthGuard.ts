import { Injectable, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RaiseAlertService } from '../services/raise-alert/raise-alert.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, OnDestroy {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private raiseAlertService: RaiseAlertService
    ) { }
    ngOnDestroy(): void {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = JSON.stringify(localStorage.getItem('currentUser'));
        //const currentUser = this.authenticationService.currentUserValue;
        
        if (currentUser != null && currentUser != 'null') {
            // if logged, check if token expired and return false
            if (this.tokenExpired(this.authenticationService.currentUserValue.token)) {
                this.authenticationService.logout();
                this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url } });
                this.raiseAlertService.raiseAlert("error","Oppss...","Your session is expired. Please login again");
                return false;
              } 
              else {
                return true;
              }
        }

        // not logged in so redirect to login page with the return url
        this.authenticationService.logout();
        this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
    private tokenExpired(token: string) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
}