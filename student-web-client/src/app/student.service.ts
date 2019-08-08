import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private static readonly baseUrl = 'http://localhost:8443/api/students'

  constructor(private http: HttpClient) { }

  fetchStudents() {
    return this.http.get<any>(StudentService.baseUrl);
  }

  fetchStudentsByCourse(courseName: string) {
    return this.http.get<Student[]>(StudentService.baseUrl + '?courseName=' + courseName);
  }

  registerStudent(student: Student) {
    return this.http.post(StudentService.baseUrl, student);
  }

  updateStudent(student: Student) {
    return this.http.put(StudentService.baseUrl + '/' + student.studentId, student);
  }

  removeStudent(studentId: string) {
    return this.http.delete(`${StudentService.baseUrl}/${studentId}`);
  }

}
