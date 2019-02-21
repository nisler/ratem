import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentListPage } from './assignment-list.page';

describe('AssignmentListPage', () => {
  let component: AssignmentListPage;
  let fixture: ComponentFixture<AssignmentListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
