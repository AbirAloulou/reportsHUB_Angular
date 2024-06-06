import { Component, OnInit, inject } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportType } from 'src/Enums/ReportType';
import { ProfessorService } from 'src/Services/professor.service';
import { StudentService } from 'src/Services/student.service';

import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ReportService } from 'src/Services/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/Models/Student';
import { Teacher } from 'src/Models/Teacher';
import { Report } from 'src/Models/Report';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css'],
})
export class ReportFormComponent implements OnInit {
  form!: FormGroup;
  authorsList: Student[] = [];
  professorsList: Teacher[] = [];
  keywordsList: string[] = [];
  currentId!: number;
  supervisor!: FormControl;
  typeInternship = Object.values(ReportType);
  announcer = inject(LiveAnnouncer);

  constructor(
    private SS: StudentService,
    private PS: ProfessorService,
    private RS: ReportService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.params['id'];
    //si on est en mode edition
    if (!!this.currentId) {
      this.RS.getReport(this.currentId).subscribe((data) => {
        this.getAuthorsList();
        this.getSupervisorsList();
        this.supervisor = new FormControl(data.supervisor, Validators.required);
        this.keywordsList = data.keywords;
        this.initEditForm(data);
      });
    } //si on est en mode ajout
    else {
      this.initAddForm();
      this.getAuthorsList();
      this.getSupervisorsList();
    }
  }

  getAuthorsList() {
    this.SS.getStudents().subscribe((data) => {
      this.authorsList = data;
    });
  }

  getSupervisorsList() {
    this.PS.getProfessors().subscribe((data) => {
      this.professorsList = data;
    });
  }

  removeKeyword(keyword: string) {
    const index = this.keywordsList.indexOf(keyword);
    if (index >= 0) {
      this.keywordsList.splice(index, 1);

      this.announcer.announce(`removed ${keyword}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywordsList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  initEditForm(report: Report) {
    console.log(report);
    this.form = new FormGroup({
      id: new FormControl(report.id, Validators.required),
      date: new FormControl(report.date, Validators.required),
      name: new FormControl(report.name, Validators.required),
      authors: new FormControl(report.authors),
      supervisor: new FormControl(report.supervisor),
      abstract: new FormControl(report.abstract, Validators.required),
      resume: new FormControl(report.resume, Validators.required),
      keywords: new FormControl(report.keywords),
      file: new FormControl(report.file, Validators.required),
      type: new FormControl(report.type, Validators.required),
    });
    console.log(this.form);
  }
  initAddForm() {
    this.form = new FormGroup({
      id: new FormControl(0, Validators.required),
      date: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      authors: new FormControl(null, Validators.required),
      supervisor: new FormControl(null, Validators.required),
      abstract: new FormControl(null, Validators.required),
      resume: new FormControl(null, Validators.required),
      keywords: new FormControl(null),
      file: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    //edit
    if (!!this.currentId) {
      this.RS.editReport(this.form.value).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/reports']);
      });
    } //save
    else {
      this.RS.addReport(this.form.value).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/reports']);
      });
    }
  }
  close() {
    this.router.navigate(['/reports']);
  }
}
