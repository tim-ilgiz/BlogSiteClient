import {NgModule} from "@angular/core";
import {AuthorizationComponent} from "./authorization.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginInComponent} from "./login-in/login-in.component";
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes=[
  {path:'', component: AuthorizationComponent, children: [
      {path:"", redirectTo:"LoginIn", pathMatch:"full"},
      {path:"", component:LoginInComponent},
      {path:"Registration", component:RegistrationComponent}
    ]}
];

@NgModule({
  declarations: [
    AuthorizationComponent,
    LoginInComponent,
    RegistrationComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthorizationModule { }
