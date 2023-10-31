import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Note } from '../interfaces';
import { environment } from '../../environments/environment';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should get a list of notes', () => {
    const mockNotes: Note[] = [{ id: 1, title: 'Note 1', body: 'Note 1' }, { id: 2, title: 'Note 2', body: 'Note 2' }];

    apiService.getNotes().subscribe((notes: Note[]) => {
      expect(notes).toEqual(mockNotes);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/note`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockNotes);
  });

  it('should get a single note by ID', () => {
    const noteId = 1;
    const mockNote: Note = { id: noteId, title: 'Note 1', body: 'Note 1' };

    apiService.getNote(noteId).subscribe((note: Note) => {
      expect(note).toEqual(mockNote);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/note/${noteId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockNote);
  });

  it('should create a new note', () => {
    const newNote: Note = {id: 3, title: 'Note 3', body: 'Note 3' };
    const createdNote: Note = newNote;

    apiService.createNote(newNote).subscribe((note: Note) => {
      expect(note).toEqual(createdNote);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/note`);
    expect(req.request.method).toEqual('POST');
    req.flush(createdNote);
  });

  it('should update an existing note', () => {
    const noteId = 1;
    const updatedNote: Note = { id: noteId, title: 'updated Note', body: 'updated Note' };

    apiService.updateNote(noteId, updatedNote).subscribe((note: Note) => {
      expect(note).toEqual(updatedNote);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/note/${noteId}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(updatedNote);
  });

  it('should delete a note', () => {
    const noteId = 1;

    apiService.deleteNote(noteId).subscribe();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/note/${noteId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});
