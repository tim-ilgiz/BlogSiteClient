import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/Authentication/auth.service";
import {UserRegistration} from "../../Domain/Models/Auth/UserRegistration";
import { Router} from "@angular/router";
import {AuthGuard} from "../../core/Authentication/auth.guard";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', "../account.component.scss"]
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private authGuard: AuthGuard) { }

  userRegistration: UserRegistration = new UserRegistration();

  login() {
    this.authService.login().then(r => r);
  }

  ngOnInit() { }

  onSubmit() {
    this.authGuard.fakeActivate();
    this.router.navigate(['']);
  }
}
