import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/Models/Student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private httpClient: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>('http://localhost:3000/students');
  }
  getStudent(id: number): Observable<Student> {
    return this.httpClient.get<Student>(`http://localhost:3000/students/${id}`);
  }
  editStudent(student: Student): Observable<Student> {
    return this.httpClient.put<Student>(
      `http://localhost:3000/students/${student.id}`,
      student
    );
  }
  deleteStudent(id: number): Observable<Student> {
    return this.httpClient.delete<Student>(
      `http://localhost:3000/students/${id}`
    );
  }
  addStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(
      `http://localhost:3000/students`,
      student
    );
  }
}
