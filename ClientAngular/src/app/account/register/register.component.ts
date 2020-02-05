import { Component } from '@angular/core';
import {UserRegistration} from "../../Domain/Models/Auth/UserRegistration";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', "../account.component.scss"]
})
export class RegisterComponent {

  userRegistration: UserRegistration = new UserRegistration();
  constructor() { }

}
