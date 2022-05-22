import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedService } from '../shared.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser!: Observable<User>;

    public roleArr: Role[] = [
        {
            "id": 1,
            "name":"SuperUser",
        },
        {
            "id": 2,
            "name":"NormalUser",
        },
        {
            "id": 3,
            "name":"SuperUser",
        }
    ];
    public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public loggedOut: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private errorCode!: BehaviorSubject<string>;
    public sharedErrorCode!: Observable<string>;

    constructor(private http: HttpClient, private shared: SharedService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
        this.errorCode = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('errorStatus')!));
        this.sharedErrorCode = this.errorCode.asObservable()
    }


    public nextErrorCode(val: string){
        this.errorCode.next(val);
    }
    
    public get currentErrorCode(): string {
        return this.errorCode.value;
    }
    /*nextErrorCode(val:number){
        this.errorCode.next(val);
    }*/
    public nextUserValue(val: User){
        this.currentUserSubject.next(val);
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(cre: Credential) {
        return this.shared.sendLoginRequest(cre)
            .pipe(map(data => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if(data.status == 200)
                {
                    localStorage.setItem('currentUser', JSON.stringify(data.data));
                    this.currentUserSubject.next(data.data);
                    this.loggedIn.next(true);
                    this.loggedOut.next(false);
                    return data;
                }
                else
                {
                    return data;
                }
            }));
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.loggedIn.next(false);
        this.loggedOut.next(true);
        this.currentUserSubject.next(null!);
    }
}