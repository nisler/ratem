import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCuPage } from './course-cu.page';

describe('CourseCuPage', () => {
  let component: CourseCuPage;
  let fixture: ComponentFixture<CourseCuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
