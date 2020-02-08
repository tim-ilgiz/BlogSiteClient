import { Injectable } from "@angular/core";
import { BaseService } from "../../shared/base.service";
import { HttpClient } from "@angular/common/http";
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { BehaviorSubject } from "rxjs";
import { ConfigService } from "../../shared/config.service";
import { catchError } from 'rxjs/operators';
import {UserRegistration} from "../../Domain/Models/Auth/UserRegistration";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  private user: User | null;
  private manager = new UserManager(getClientSettings());

  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  authNavStatus$ = this._authNavStatusSource.asObservable();

  constructor (private http: HttpClient, private configService: ConfigService) {
    super();

    this.manager.getUser().then(user => {
      this.user = user;
      this._authNavStatusSource.next(this.isAuthenticated());
    });
  };

  register(userRegistration: UserRegistration) {
    return this.http.post(this.configService.authApiURI, userRegistration).pipe(catchError(this.handleError));
  }

  login() {
    return this.manager.signinRedirect();
  }

  async completeAuthentication() {
    this.user = await this.manager.signinRedirectCallback();
    this._authNavStatusSource.next(this.isAuthenticated());
  }

  isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  }

  get authorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  get name(): string {
    return this.user != null ? this.user.profile.name : '';
  }

  async signOut() {
    await this.manager.signoutRedirect();
  }
}

export function getClientSettings(): UserManagerSettings
{
  return {
    authority: 'https://auth.detree.ru/api/account',
    client_id: 'angular_spa',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: "id_token token",
    scope: "openid profile email api.read",
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: 'http://localhost:4200/silent-refresh.html'
  };
}
