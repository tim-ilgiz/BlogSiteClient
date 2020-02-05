import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule, MatIconModule, MatButtonModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ItemsComponent } from './components/items/items.component';
import { ContentComponent } from './components/content/content.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { StyleDirective } from "./shared/Directives/style.directive";
import { AngularResizeElementModule } from "angular-resize-element";
import { AppRoutingModule } from "./app-routing-module";
import { WorkSpaceComponent } from './components/work-spase/work-space.component';
import { BoardComponent } from './components/board/board.component';
import { NgProgressModule } from "@ngx-progressbar/core";
import { AuthorizationModule } from "./authorization/authorization.module";
import { EditWindowModule } from "./editWindow";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import {ShellModule} from "./shell/shell.module";
import {AccountModule} from "./account/account.module";

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ContentComponent,
    StyleDirective,
    WorkSpaceComponent,
    BoardComponent,
    AuthCallbackComponent
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
    EditWindowModule,
    DragDropModule,

    AppRoutingModule,
    ShellModule,
    AccountModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

