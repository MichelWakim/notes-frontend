import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteListComponent } from './components/note-list/note-list.component';
import {CreateEditNoteComponent} from "./components/create-edit-note/create-edit-note.component";
import {TrackingComponent} from "./components/tracking/tracking.component";

const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'notes', component: NoteListComponent },
  { path: 'notes/edit/:id', component: CreateEditNoteComponent },
  { path: 'notes/create', component: CreateEditNoteComponent },
  { path: 'tracking', component: TrackingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
