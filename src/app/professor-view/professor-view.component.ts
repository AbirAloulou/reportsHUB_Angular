import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from 'src/Models/Teacher';

@Component({
  selector: 'app-professor-view',
  templateUrl: './professor-view.component.html',
  styleUrls: ['./professor-view.component.css'],
})
export class ProfessorViewComponent {
  teacher: Teacher = {} as Teacher;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: Teacher,
    private dialogRef: MatDialogRef<ProfessorViewComponent>
  ) {
    this.teacher = data;
  }

  close() {
    this.dialogRef.close();
  }
}
