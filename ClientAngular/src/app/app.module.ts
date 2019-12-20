import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule, MatIconModule, MatButtonModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { ItemsComponent } from './components/items/items.component';
import { ContentComponent } from './components/content/content.component';
import { FormsModule } from '@angular/forms';
import {FlexLayoutModule} from "@angular/flex-layout";
import {StyleDirective} from "./Directives/style.directive";
import {AngularResizeElementModule} from "angular-resize-element";
import {DropdownModule} from "ngx-dropdown";


@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ContentComponent,
    StyleDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    AngularResizeElementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

