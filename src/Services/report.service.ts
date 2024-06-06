import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from 'src/Models/Report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private httpClient: HttpClient) {}

  getReports(): Observable<Report[]> {
    return this.httpClient.get<Report[]>('http://localhost:3000/reports');
  }
  getReport(id: number): Observable<Report> {
    return this.httpClient.get<Report>(`http://localhost:3000/reports/${id}`);
  }
  editReport(report: Report): Observable<Report> {
    return this.httpClient.put<Report>(
      `http://localhost:3000/reports/${report.id}`,
      report
    );
  }
  deleteReport(id: number): Observable<Report> {
    return this.httpClient.delete<Report>(
      `http://localhost:3000/reports/${id}`
    );
  }
  addReport(report: Report): Observable<Report> {
    return this.httpClient.post<Report>(
      `http://localhost:3000/reports`,
      report
    );
  }
}
