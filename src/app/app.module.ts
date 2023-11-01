import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteComponent } from './components/note-list/note/note.component';
import { CreateEditNoteComponent } from './components/create-edit-note/create-edit-note.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { TrackingComponent } from './components/tracking/tracking.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteComponent,
    CreateEditNoteComponent,
    NavBarComponent,
    TrackingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
