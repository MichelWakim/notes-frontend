import { Component, OnDestroy, OnInit} from '@angular/core';
import {Note} from "../../interfaces";
import {ApiService} from "../../services/api.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  private getNotesSubscription: Subscription = new Subscription();
  constructor(private _apiService: ApiService, private _router: Router) {}

  ngOnInit() {
    this.getNotesSubscription = this._apiService
      .getNotes()
      .subscribe((notes) => (this.notes = notes));
  }
  ngOnDestroy() {
    this.getNotesSubscription.unsubscribe();
  }
  refreshComponent(value: boolean) {
    if(value) {
      this.ngOnInit()
    }
  }
}

