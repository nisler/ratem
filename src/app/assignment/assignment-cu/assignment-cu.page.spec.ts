import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentCuPage } from './assignment-cu.page';

describe('AssignmentCuPage', () => {
  let component: AssignmentCuPage;
  let fixture: ComponentFixture<AssignmentCuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentCuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentCuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
