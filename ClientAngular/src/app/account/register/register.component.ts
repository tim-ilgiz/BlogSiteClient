import { Component } from '@angular/core';
import { UserRegistration } from "../../Domain/Models/Auth/UserRegistration";
import { NgForm } from "@angular/forms";
import { DataService } from "../../shared/Services/DataService";
import { AuthService } from "../../core/Authentication/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ["../account.component.scss"],
  providers:[ DataService ]
})
export class RegisterComponent {
  userRegistration: UserRegistration = new UserRegistration();

  private _errors: string[];
  private _isLoading: boolean = false;
  private _isFormValid: boolean = false;

  constructor(private authService: AuthService) { }

  OnSubmit(form: NgForm) {

    this._isFormValid = true;

    if(form.valid) {
      this.authService.register(this.userRegistration)
        .subscribe(() => this._isLoading = true,
                   error => {
                      this._errors = error.message;
                      this._isLoading = false
                   },
               () => this._isLoading = false);
    }
  }
}
