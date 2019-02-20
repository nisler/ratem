import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterCuPage } from './semester-cu.page';

describe('SemesterCuPage', () => {
  let component: SemesterCuPage;
  let fixture: ComponentFixture<SemesterCuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemesterCuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterCuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
