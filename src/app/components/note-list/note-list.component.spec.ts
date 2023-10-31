import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteListComponent } from './note-list.component';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';
import { Note } from '../../interfaces';
import {NoteComponent} from "./note/note.component";

describe('NoteListComponent', () => {
  let component: NoteListComponent;
  let fixture: ComponentFixture<NoteListComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiService = jasmine.createSpyObj('ApiService', ['getNotes']);

    TestBed.configureTestingModule({
      declarations: [NoteListComponent, NoteComponent],
      providers: [{ provide: ApiService, useValue: apiService }],
    });

    fixture = TestBed.createComponent(NoteListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch notes on initialization', () => {
    const mockNotes: Note[] = [{ id: 1, title: 'Note 1', body: 'Body 1' }];

    apiService.getNotes.and.returnValue(of(mockNotes));

    fixture.detectChanges();

    expect(component.notes).toEqual(mockNotes);
  });

  // it('should unsubscribe on destroy', () => {
  //   spyOn(component.getNotesSubscription, 'unsubscribe');
  //
  //   component.ngOnDestroy();
  //
  //   expect(component.getNotesSubscription.unsubscribe).toHaveBeenCalled();
  // });
});
