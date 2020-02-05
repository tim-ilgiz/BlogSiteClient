import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate {

  public canActivated: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //if (this.authService.isAuthenticated()) return true;
    if(!this.canActivated) {
      this.router.navigate(['/login'], {queryParams: {redirect: state.url}, replaceUrl: true});
    }

    return this.canActivated;
  }
  fakeActivate() {
    this.canActivated = true;
  }
}
