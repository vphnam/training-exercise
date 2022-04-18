import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './models/role';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication/authentication.service';
import { LoaderService } from './services/loader/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    currentUser!: User;

    role!: Role[];
    title = 'angular';
    constructor(
        private router: Router,
        public authenticationService: AuthenticationService,
        public loader: LoaderService
    ) 
    {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        const sessionUser = JSON.parse(localStorage.getItem('currentUser')!);
        if(this.currentUser == null)
            this.currentUser = sessionUser;
        if(this.currentUser)
        {
            this.authenticationService.loggedIn.next(true);
            this.authenticationService.loggedOut.next(false);
        }
        this.role = this.authenticationService.roleArr;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/user/login']);
    }
}