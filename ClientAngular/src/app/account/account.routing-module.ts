import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShellService} from "../shell/shell/shall.service";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  ShellService.childRoutes ([
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent}
    ]
  )];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AccountRoutingModule { }
