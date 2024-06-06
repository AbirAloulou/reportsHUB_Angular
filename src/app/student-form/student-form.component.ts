import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/Models/Student';
import { FieldOfStudy } from 'src/Enums/FieldOfStudy';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent implements OnInit {
  student: Student = {} as Student;
  form!: FormGroup;
  hide = true;
  fieldsOfStudy = Object.values(FieldOfStudy);

  constructor(
    private dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {
    this.student = data;
  }

  ngOnInit(): void {
    this.initEditForm();
  }
  initEditForm() {
    this.form = new FormGroup({
      id: new FormControl(this.student.id, Validators.required),
      CIN: new FormControl(this.student.CIN, Validators.required),
      name: new FormControl(this.student.name, Validators.required),
      lastname: new FormControl(this.student.lastname, Validators.required),
      birthdate: new FormControl(this.student.birthdate, Validators.required),
      phone: new FormControl(this.student.phone, Validators.required),
      email: new FormControl(this.student.email, Validators.required),
      password: new FormControl(this.student.password, Validators.required),
      fieldOfStudy: new FormControl(
        this.student.fieldOfStudy,
        Validators.required
      ),
      inscriptionDate: new FormControl(
        this.student.inscriptionDate,
        Validators.required
      ),
    });
  }

  onEdit() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
