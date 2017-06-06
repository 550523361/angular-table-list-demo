import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {BaseTableListComponent} from "angular-component-table"
import {BaseTableListPager} from "angular-component-pager";
import {BaseTableListQueryComponent} from "angular-component-table-query";
@NgModule({
  declarations: [
    AppComponent,
    BaseTableListComponent,
    BaseTableListQueryComponent,
    BaseTableListPager
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
