import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/Models/Student';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.css'],
})
export class StudentDeleteComponent {
  student: Student = {} as Student;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: Student,
    private dialogRef: MatDialogRef<StudentDeleteComponent>
  ) {
    this.student = data;
  }
  delete() {
    this.dialogRef.close(true);
  }
}
