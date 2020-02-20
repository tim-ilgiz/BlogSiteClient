import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/Authentication/auth.service";

import { Router} from "@angular/router";
import { User } from "../../Domain/Models/Auth/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', "../account.component.scss"]
})
export class LoginComponent implements OnInit {

  private _loading: boolean;
  private _errors: string;
  private User: User = new User();

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() { }

  onSubmit() {
    this._loading = true;
    this.authService.login(this.User.email, this.User.password)
      .subscribe(
        res => console.log(res),
        error => {
          this._errors = error.message;
          this._loading = false;
        });

    if (this.authService.currentUser) {
      this.router.navigate(['']);
    }
  }
}
