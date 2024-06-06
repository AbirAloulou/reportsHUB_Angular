import { Component, Inject } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Report } from 'src/Models/Report';
import { Student } from 'src/Models/Student';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css'],
})
export class ReportViewComponent {
  report: Report = {} as Report;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Report,
    private dialogRef: MatDialogRef<ReportViewComponent>
  ) {
    this.report = data;
    console.log(this.report);
  }
  close() {
    this.dialogRef.close();
  }
}
