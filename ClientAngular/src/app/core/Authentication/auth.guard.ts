import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

    let user = this.authService.GetUser;

    if (user) {
      return true;
    }

    this.router.navigate(['/login'],
      {queryParams: {redirect: state.url}, replaceUrl: true}).then();
    return false;
  }
}
