import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class UserLoginService {

    private username: string = "Admin";
    private password: string = "Admin";
    private loggedIn: boolean;

    constructor(private http: HttpClient, private cookie: CookieService) {
        let temp = this.cookie.get('status');
        if (temp) this.loggedIn = (temp == "true") ? true : false;
        else this.loggedIn = false;
    }

    SignIn(username: string, pass: string) : Observable<any> {
        if ((username.toLowerCase() === this.username.toLowerCase()) && (pass.toLowerCase() === this.password.toLowerCase())) {
            this.loggedIn = true;
            this.cookie.set('status', 'true', 1);
        }
        const body = {
            "emailId": username,
            "password": pass
        }
        return this.http.post(`${environment.apiUrl}/api/user/login`, body);
        //return false;
    }
    SignOut() {
        this.cookie.delete('status');
        this.loggedIn = false;
    }

    get status() { return this.loggedIn; }

}
