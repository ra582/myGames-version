import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { E404Component } from './e404/e404.component';
import { AboutComponent } from './about/about.component';
import { FormComponent } from './form/form.component';

import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    NewComponent,
    E404Component,
    AboutComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,


    AngularFireModule.initializeApp(environment.firebase),


    AngularFirestoreModule,

    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
