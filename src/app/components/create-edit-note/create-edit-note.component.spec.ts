import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditNoteComponent } from './create-edit-note.component';
import {ActivatedRoute, RouterLink} from "@angular/router";

describe('CreateEditNoteComponent', () => {
  let component: CreateEditNoteComponent;
  let fixture: ComponentFixture<CreateEditNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditNoteComponent],
      imports: [RouterLink, ActivatedRoute]
    });
    fixture = TestBed.createComponent(CreateEditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
