import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from 'src/Models/Teacher';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  constructor(private httpClient: HttpClient) {}

  getProfessors(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>('http://localhost:3000/supervisors');
  }
  getProfessor(id: number): Observable<Teacher> {
    return this.httpClient.get<Teacher>(
      `http://localhost:3000/supervisors/${id}`
    );
  }
  editProfessor(teacher: Teacher): Observable<Teacher> {
    return this.httpClient.put<Teacher>(
      `http://localhost:3000/supervisors/${teacher.id}`,
      teacher
    );
  }
  deleteProfessor(id: number): Observable<Teacher> {
    return this.httpClient.delete<Teacher>(
      `http://localhost:3000/supervisors/${id}`
    );
  }
  addProfessor(teacher: Teacher): Observable<Teacher> {
    return this.httpClient.post<Teacher>(
      `http://localhost:3000/supervisors`,
      teacher
    );
  }
}
