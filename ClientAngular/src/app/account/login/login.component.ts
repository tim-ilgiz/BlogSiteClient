import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/Authentication/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login().then(r => r);
  }

  ngOnInit() { }

  onSubmit() {

  }
}
