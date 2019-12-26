import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ItemsComponent} from "./components/items/items.component";
import {WorkSpaceComponent} from "./work-spase/work-space.component";

const routes: Routes=[
  {path:'spaceComponent', component: WorkSpaceComponent},
  {path:'editTree', component: ItemsComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
