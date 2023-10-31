import { Component, OnDestroy, OnInit } from '@angular/core';
import { Note } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-create-edit-note',
  templateUrl: './create-edit-note.component.html',
  styleUrls: ['./create-edit-note.component.css'],
})
export class CreateEditNoteComponent implements OnInit, OnDestroy {
  note: Note = { id: 0, title: '', body: '' };
  editMode: boolean = false;
  id: number = -1;
  private getNoteByIdSubscription: Subscription = new Subscription();
  private createNoteSubscription: Subscription = new Subscription();
  private editNoteSubscription: Subscription = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _apiService: ApiService,
  ) {}

  ngOnInit(): void {
    const idParam: string | null = this._route.snapshot.paramMap.get('id');

    if (idParam) {
      this.id = +idParam;
      if (!isNaN(this.id)) {
        this.editMode = true;
        this.getNoteByIdSubscription = this._apiService
          .getNote(this.id)
          .pipe(
            catchError((error) => {
              // Handle the error (e.g., show an error message)
              return throwError(error); // Re-throw the error to continue propagating it
            })
          )
          .subscribe(
            (note) => {
              this.note = note;
            }
          );
      }
    } else {
      this.editMode = false;
    }
  }

  ngOnDestroy(): void {
    this.getNoteByIdSubscription.unsubscribe();
    this.createNoteSubscription.unsubscribe();
    this.editNoteSubscription.unsubscribe();
  }

  saveNote() {
    if (this.editMode) {
      this.editNoteSubscription = this._apiService
        .updateNote(this.id, this.note)
        .pipe(
          catchError((error) => {
            // Handle the error (e.g., show an error message)
            return throwError(error); // Re-throw the error to continue propagating it
          })
        )
        .subscribe(
          (note) => {
            this.note = note;
            this.navigateToNotes();
          }
        );
    } else {
      this.createNoteSubscription = this._apiService
        .createNote(this.note)
        .pipe(
          catchError((error) => {
            // Handle the error (e.g., show an error message)
            return throwError(error); // Re-throw the error to continue propagating it
          })
        )
        .subscribe(
          (note) => {
            this.note = note;
            this.navigateToNotes();
          }
        );
    }
  }

  private navigateToNotes() {
    this._router.navigate(['/notes']);
  }
}
