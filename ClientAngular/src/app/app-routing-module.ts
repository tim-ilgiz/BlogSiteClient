import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WorkSpaceComponent} from "./work-spase/work-space.component";
import { BoardComponent } from './board/board.component';

const routes: Routes=[
  {path:'spaceComponent', component: WorkSpaceComponent},
  {path:'boardComponent', component: BoardComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
