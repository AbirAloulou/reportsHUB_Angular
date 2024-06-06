import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from 'src/Models/Teacher';

@Component({
  selector: 'app-professor-delete',
  templateUrl: './professor-delete.component.html',
  styleUrls: ['./professor-delete.component.css'],
})
export class ProfessorDeleteComponent {
  teacher: Teacher = {} as Teacher;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: Teacher,
    private dialogRef: MatDialogRef<ProfessorDeleteComponent>
  ) {
    this.teacher = data;
  }
  delete() {
    this.dialogRef.close(true);
  }
}
