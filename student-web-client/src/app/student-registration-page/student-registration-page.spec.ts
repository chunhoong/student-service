import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegistrationPage } from './student-registration-page';

describe('StudentRegistrationPage', () => {
  let component: StudentRegistrationPage;
  let fixture: ComponentFixture<StudentRegistrationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentRegistrationPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
