import { Component, OnInit } from '@angular/core';
import { Student } from 'src/Models/Student';
import { FieldOfStudy } from 'src/Enums/FieldOfStudy';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css'],
})
export class StudentAddComponent implements OnInit {
  fieldsOfStudy = Object.values(FieldOfStudy);
  form!: FormGroup;
  constructor(private dialogRef: MatDialogRef<StudentAddComponent>) {}
  ngOnInit(): void {
    this.initAddForm();
  }
  initAddForm() {
    this.form = new FormGroup({
      id: new FormControl(0, Validators.required),
      CIN: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      birthdate: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      fieldOfStudy: new FormControl(null, Validators.required),
      inscriptionDate: new FormControl(null, Validators.required),
    });
  }
  onAdd() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
