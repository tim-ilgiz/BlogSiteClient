import { Component } from '@angular/core';
import {UserRegistration} from "../../Domain/Models/Auth/UserRegistration";
import {NgForm} from "@angular/forms";
import {DataService} from "../../shared/Services/DataService";
import {AuthService} from "../../core/Authentication/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', "../account.component.scss"],
  providers:[DataService]
})
export class RegisterComponent {
  userRegistration: UserRegistration = new UserRegistration();

  isValidationForm: boolean = false;
  errors:string[] = [];

  constructor(private authService: AuthService) { }

  OnSubmit(form: NgForm) {
    if(form.valid) {
      this.authService.register(this.userRegistration).subscribe(i => console.log(i));
    }
    this.isValidationForm = true;
  }
}
