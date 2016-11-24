import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { StorageService } from './storage.service'

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http, private router: Router, private storage: StorageService) {
        // set token if saved in local storage
        var currentUser = JSON.parse(this.storage.getItem('currentUser'));
            this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        let body = "username=" + username + "&password=" + password;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/token', body, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().access_token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    this.storage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    console.debug("logged in");

                    // return true to indicate successful login
                    return true;
                } else {
                    console.debug("not logged in");
                    // return false to indicate failed login
                    return false;
                }
            },
            (err) => { console.log(err); return false; });
    }

    logout(redirect?: boolean): void {
        if (typeof redirect === "undefined" || redirect == null) {
            redirect = false;
        }
        // clear token remove user from local storage to log user out
        this.token = null;
        this.storage.removeItem('currentUser');

        if (redirect) {
            this.router.navigate(['/login']);
        }
    }
}