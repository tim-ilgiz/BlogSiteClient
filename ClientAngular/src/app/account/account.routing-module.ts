import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  // Shell.childRoutes([
  //   { path: 'login', component: LoginComponent },
  //   { path: 'register', component: RegisterComponent }
  // ])
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: []
})
export class AccountRoutingModule { }
