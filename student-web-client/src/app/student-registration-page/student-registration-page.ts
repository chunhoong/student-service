import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CoursesService } from '../courses.service';
import { Course } from '../course';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-registration-page',
  templateUrl: './student-registration-page.html',
  styleUrls: ['./student-registration-page.css']
})
export class StudentRegistrationPage implements OnInit, OnDestroy {

  availableCourses: Course[];
  studentForm: FormGroup;
  registrationSubscription: Subscription;
  coursesToBeRegistered: string[] = [];

  constructor(
    private fb: FormBuilder,
    private courseSvc: CoursesService,
    private studentSvc: StudentService
  ) { }

  ngOnInit() {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.fetchAvailableCourses();
  }

  ngOnDestroy() {
    this.registrationSubscription.unsubscribe();
  }

  fetchAvailableCourses() {
    this.courseSvc.fetchAvailableCourses()
      .subscribe(
        availableCourses => {
          this.availableCourses = availableCourses;
        }
      );
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

  updateCoursesTobeRegistered(courseCode: string) {
    console.log(`CoursesToBeRegistered[before]: ${JSON.stringify(this.coursesToBeRegistered)}`);
    if (this.coursesToBeRegistered.includes(courseCode)) {
      this.coursesToBeRegistered = this.coursesToBeRegistered.filter(c => c !== courseCode);
    } else {
      this.coursesToBeRegistered.push(courseCode);
    }
    console.log(`CoursesToBeRegistered[after]: ${JSON.stringify(this.coursesToBeRegistered)}`);
  }

}
