import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/Models/Student';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
})
export class StudentViewComponent {
  student: Student = {} as Student;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: Student,
    private dialogRef: MatDialogRef<StudentViewComponent>
  ) {
    this.student = data;
  }

  close() {
    this.dialogRef.close();
  }
}
