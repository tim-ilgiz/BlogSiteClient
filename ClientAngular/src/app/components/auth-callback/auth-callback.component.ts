import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private router: Router,
              private activateRoute: ActivatedRoute) { }

  error: boolean;

  async ngOnInit() {
    if(this.activateRoute.snapshot.fragment.indexOf('error')) {
      this.error = true;
      return;
    }

    await this.router.navigate(['/home']);
  }
}
