import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
    //Проверка авторизации, если да, шлет на workSpace
    //Если нет -> login

    this.route.navigate(['/home']);
  }
}
