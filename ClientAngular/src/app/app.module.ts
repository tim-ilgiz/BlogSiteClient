import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule, MatIconModule, MatButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

import { ItemsComponent } from './components/items/items.component';
import { ContentComponent } from './components/content/content.component';
import { FormsModule } from '@angular/forms';
import {FlexLayoutModule} from "@angular/flex-layout";
import {StyleDirective} from "./Directives/style.directive";
import {AngularResizeElementModule} from "angular-resize-element";
import {AppRoutingModule} from "./app-routing-module";
import { WorkSpaceComponent } from './work-spase/work-space.component';
import { BoardComponent } from './board/board.component';
import {NgProgressModule} from "@ngx-progressbar/core";
import {AuthorizationModule} from "./authorization/authorization.module";
import {SharedModule} from "./shared/shared.module";
import {EditWindowModule} from "./editWindow";
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ContentComponent,
    StyleDirective,
    WorkSpaceComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    AngularResizeElementModule,
    NgProgressModule,
    AuthorizationModule,
    AppRoutingModule,
    SharedModule,
    EditWindowModule,
    DragDropModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

