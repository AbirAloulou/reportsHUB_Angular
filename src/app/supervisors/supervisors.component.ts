import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Teacher } from 'src/Models/Teacher';
import { ProfessorService } from 'src/Services/professor.service';
import { ProfessorViewComponent } from '../professor-view/professor-view.component';
import { ProfessorFormComponent } from '../professor-form/professor-form.component';
import { ProfessorDeleteComponent } from '../professor-delete/professor-delete.component';
import { ProfessorAddComponent } from '../professor-add/professor-add.component';

@Component({
  selector: 'app-supervisors',
  templateUrl: './supervisors.component.html',
  styleUrls: ['./supervisors.component.css'],
})
export class SupervisorsComponent implements OnInit {
  constructor(private PS: ProfessorService, private dialog: MatDialog) {}
  dataSource = new MatTableDataSource<Teacher>();
  displayedColumns: string[] = [
    'CIN',
    'Fullname',
    'Email',
    'Establishment',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.PS.getProfessors().subscribe((result) => {
      this.dataSource.data = result;
    });
  }
  view(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.height = '500px';
    dialogConfig.width = '400px';
    this.PS.getProfessor(id).subscribe((result) => {
      dialogConfig.data = result;
      this.dialog.open(ProfessorViewComponent, dialogConfig);
    });
  }

  edit(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '550px';
    dialogConfig.width = '800px';
    this.PS.getProfessor(id).subscribe((result) => {
      dialogConfig.data = result;
      let dialogRef = this.dialog.open(ProfessorFormComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.PS.editProfessor(result).subscribe(() => {
            this.PS.getProfessors().subscribe((res) => {
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
    this.PS.getProfessor(id).subscribe((result) => {
      dialogConfig.data = result;
      let dialogRef = this.dialog.open(ProfessorDeleteComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.PS.deleteProfessor(id).subscribe(() => {
            this.PS.getProfessors().subscribe((res) => {
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
    let dialogRef = this.dialog.open(ProfessorAddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result.id != 0) {
        this.PS.addProfessor(result).subscribe(() => {
          this.PS.getProfessors().subscribe((res) => {
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
