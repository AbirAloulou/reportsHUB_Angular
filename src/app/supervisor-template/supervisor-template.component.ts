import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Report } from 'src/Models/Report';
import { Teacher } from 'src/Models/Teacher';
import { AuthService } from 'src/Services/auth.service';
import { ProfessorService } from 'src/Services/professor.service';
import { ReportService } from 'src/Services/report.service';
import { ReportViewComponent } from '../report-view/report-view.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisor-template',
  templateUrl: './supervisor-template.component.html',
  styleUrls: ['./supervisor-template.component.css'],
})
export class SupervisorTemplateComponent implements OnInit {
  idSupervisorCourant!: number;
  supervisor: Teacher = {} as Teacher;
  // reportsOfCurrentSupervisor: Report[] = [];
  constructor(
    private PS: ProfessorService,
    private AS: AuthService,
    private RS: ReportService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.RS.getReports().subscribe((res) => {
      console.log(res);
    });
  }
  @Output() userEmitter = new EventEmitter<any>();
  dataSource = new MatTableDataSource<Report>();
  displayedColumns: string[] = [
    'name',
    'type',
    'authors',
    'keywords',
    'viewMore',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.AS.getCurrentUser().subscribe((res) => {
      this.idSupervisorCourant = res.id;
      console.log(this.idSupervisorCourant);
      this.PS.getProfessor(this.idSupervisorCourant).subscribe((res) => {
        this.supervisor = res;
        console.log(this.supervisor);
        this.RS.getReportsOfProfessor(this.idSupervisorCourant).subscribe(
          (res) => {
            console.log(res);
            this.dataSource.data = res;
          }
        );
      });
    });
  }
  signout(): void {
    this.AS.doLogout().then(() => {
      this.router.navigate(['/login']);
    });
  }
  view(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.height = '600px';
    dialogConfig.width = '700px';
    this.RS.getReport(id).subscribe((result) => {
      dialogConfig.data = result;
      this.dialog.open(ReportViewComponent, dialogConfig);
    });
  }
  getAuthors(row: any): string {
    return row.authors
      .map((author: any) => `${author.name} ${author.lastname}`)
      .join(', ');
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
