import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ConfigService } from "../../shared/config.service";
import { UserRegistration } from "../../Domain/Models/Auth/UserRegistration";
import { User } from "../../Domain/Models/Auth/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private _http: HttpClient,
              private _configService: ConfigService) {
    this._currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this._currentUserSubject.asObservable();
  };

  public get GetUser (): User {
    return this._currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this._http.post<any>(`${this._configService.authApiURILogin}`, { email, password })
      .pipe(
        map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this._currentUserSubject.next(user);
          return user;
      }));
  }

  register(userRegistration: UserRegistration) {
    return this._http.post(this._configService.authApiURI, userRegistration);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this._currentUserSubject.next(null);
  }
}
