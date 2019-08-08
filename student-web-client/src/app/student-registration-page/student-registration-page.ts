import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CoursesService } from '../courses.service';
import { Course } from '../course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-registration-page',
  templateUrl: './student-registration-page.html',
  styleUrls: ['./student-registration-page.css']
})
export class StudentRegistrationPage implements OnInit, OnDestroy {

  availableCourses$: Observable<Course[]>;
  studentForm: FormGroup;
  registrationSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private courseSvc: CoursesService,
    private studentSvc: StudentService
  ) { }

  ngOnInit() {
    this.availableCourses$ = this.courseSvc.fetchAvailableCourses();
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.registrationSubscription.unsubscribe();
  }

  onRegister() {
    if (this.studentForm.valid) {
      let firstName = this.studentForm.get('firstName').value;
      let lastName = this.studentForm.get('lastName').value;
      this.registrationSubscription = this.studentSvc.registerStudent({ firstName, lastName })
        .subscribe(
          () => {
            alert(`${firstName} is successfully registered`);
          },
          error => {
            alert(error);
          }
        );
    }
  }

}
