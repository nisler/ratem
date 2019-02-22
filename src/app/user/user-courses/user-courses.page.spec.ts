import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoursesPage } from './user-courses.page';

describe('UserCoursesPage', () => {
  let component: UserCoursesPage;
  let fixture: ComponentFixture<UserCoursesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCoursesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
