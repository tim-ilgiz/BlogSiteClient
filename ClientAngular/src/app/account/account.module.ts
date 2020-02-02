import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AccountRoutingModule} from "./account.routing-module";
import {AuthService} from "../core/Authentication/auth.service";
import {FormsModule} from "@angular/forms";
import {ConfigService} from "../shared/config.service";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule
  ],
  providers:[AuthService, ConfigService]
})
export class AccountModule { }
