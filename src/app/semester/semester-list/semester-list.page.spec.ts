import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterListPage } from './semester-list.page';

describe('SemesterListPage', () => {
  let component: SemesterListPage;
  let fixture: ComponentFixture<SemesterListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemesterListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
