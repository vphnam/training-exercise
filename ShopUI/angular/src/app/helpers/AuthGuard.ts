import { Injectable, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/user';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, OnDestroy {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }
    ngOnDestroy(): void {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = JSON.stringify(localStorage.getItem('currentUser'));
        //const currentUser = this.authenticationService.currentUserValue;
        
        if (currentUser != null && currentUser != 'null') {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.authenticationService.logout();
        this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}