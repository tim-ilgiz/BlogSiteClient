import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthCallbackComponent} from "./components/auth-callback/auth-callback.component";
import {WorkSpaceComponent} from "./components/work-spase/work-space.component";
import {AuthGuard} from "./core/Authentication/auth.guard";

const routes: Routes = [
  {path:'', component: WorkSpaceComponent, canActivate:[AuthGuard]},
  {path: 'app-auth-callback', component: AuthCallbackComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
