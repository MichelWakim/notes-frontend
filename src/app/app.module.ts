import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteComponent } from './components/note-list/note/note.component';
import { CreateEditNoteComponent } from './components/create-edit-note/create-edit-note.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from "@angular/forms";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteComponent,
    CreateEditNoteComponent,
    NavBarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
