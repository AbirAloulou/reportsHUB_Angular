import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/Models/Student';
import { StudentService } from 'src/Services/student.service';
import { StudentViewComponent } from '../student-view/student-view.component';
import { StudentFormComponent } from '../student-form/student-form.component';
import { StudentAddComponent } from '../student-add/student-add.component';
import { StudentDeleteComponent } from '../student-delete/student-delete.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  constructor(private SS: StudentService, private dialog: MatDialog) {}
  dataSource = new MatTableDataSource<Student>();
  displayedColumns: string[] = [
    'CIN',
    'Fullname',
    'Email',
    'FieldOfStudy',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.SS.getStudents().subscribe((result) => {
      this.dataSource.data = result;
    });
  }

  view(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.height = '500px';
    dialogConfig.width = '400px';
    this.SS.getStudent(id).subscribe((result) => {
      dialogConfig.data = result;
      this.dialog.open(StudentViewComponent, dialogConfig);
    });
  }

  edit(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '550px';
    dialogConfig.width = '800px';
    this.SS.getStudent(id).subscribe((result) => {
      dialogConfig.data = result;
      let dialogRef = this.dialog.open(StudentFormComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.SS.editStudent(result).subscribe(() => {
            this.SS.getStudents().subscribe((res) => {
              this.dataSource.data = res;
            });
          });
        }
      });
    });
  }

  delete(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.height = '200px';
    dialogConfig.width = '500px';
    this.SS.getStudent(id).subscribe((result) => {
      dialogConfig.data = result;
      let dialogRef = this.dialog.open(StudentDeleteComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.SS.deleteStudent(id).subscribe(() => {
            this.SS.getStudents().subscribe((res) => {
              this.dataSource.data = res;
            });
          });
        }
      });
    });
  }

  add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '550px';
    dialogConfig.width = '800px';
    let dialogRef = this.dialog.open(StudentAddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result.id != 0) {
        this.SS.addStudent(result).subscribe(() => {
          this.SS.getStudents().subscribe((res) => {
            this.dataSource.data = res;
          });
        });
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
