import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Note} from "../../../interfaces";
import {ApiService} from "../../../services/api.service";
import {Subscription, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input({required: true}) note?: Note;
  @Output() isDeleted = new EventEmitter<boolean>();
  private deleteNoteSubscription: Subscription = new Subscription();

  constructor(private _apiService: ApiService) { }

  deleteNote(id: number | undefined) {
    if(id) {
      this.deleteNoteSubscription = this._apiService.deleteNote(id).pipe(
        catchError((error) => {
          return throwError(error);
        })
      ).subscribe((): void =>
        this.isDeleted.emit(true)
      );
    }
  }
}
