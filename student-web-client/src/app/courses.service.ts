import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './course';
import { CourseRegistry } from './course-registry';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private static readonly coursesBaseUrl = 'http://localhost:8443/api/courses';
  private static readonly courseRegistriesBaseUrl = 'http://localhost:8443/api/course-registries';

  constructor(private http: HttpClient) { }

  fetchAvailableCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(CoursesService.coursesBaseUrl);
  }

  fetchRegisteredCoursesByStudentId(studentId: string): Observable<CourseRegistry[]> {
    return this.http.get<CourseRegistry[]>(CoursesService.courseRegistriesBaseUrl + '?studentId=' + studentId);
  }

  removeRegisteredCoursesByStudentId(studentId: string): Observable<void> {
    return this.http.delete<void>(CoursesService.courseRegistriesBaseUrl + '?studentId=' + studentId)
  }

}
