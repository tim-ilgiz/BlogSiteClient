import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WorkSpaceComponent} from "./work-spase/work-space.component";
import {AuthorizationComponent} from "./authorization/authorization.component";

const routes: Routes=[
  {path:'spaceComponent', component: WorkSpaceComponent},
  {path:'', component: AuthorizationComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule { }
