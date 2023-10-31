import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Note} from "../interfaces";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;
  constructor(private _http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this._http.get<Note[]>(`${this.apiUrl}/note`);
  }

  getNote(id: number): Observable<Note> {
    return this._http.get<Note>(`${this.apiUrl}/note/${id}`);
  }

  createNote(note: Note): Observable<Note> {
    return this._http.post<Note>(`${this.apiUrl}/note`, note);
  }

  updateNote(id: number, note: Note): Observable<Note> {
    return this._http.put<Note>(`${this.apiUrl}/note/${id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/note/${id}`);
  }
}
