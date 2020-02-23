import { Component } from '@angular/core';
import { AuthService } from "../../core/Authentication/auth.service";

import { Router} from "@angular/router";
import { User } from "../../Domain/Models/Auth/User";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../account.component.scss', './login.component.css']
})
export class LoginComponent {

  private _errors: string;
  private _isLoading: boolean;
  private _isFormValid: boolean = false;

  private User: User = new User();

  constructor(private authService: AuthService,
              private router: Router) { }

  onSubmit(form: NgForm) {
    this._isFormValid = true;

    if(form.valid) {
      this._isLoading = true;

      this.authService.login(this.User.email, this.User.password)
        .subscribe(
          res => console.log(res),
          error => {
            this._errors = error.message;
            this._isLoading = false;
          },
          () => this._isLoading = false);
    }

    if (this.authService.currentUser) {
      this.router.navigate(['']).then();
    }
  }
}
