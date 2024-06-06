import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService } from 'src/Services/report.service';
import { Report } from 'src/Models/Report';
import { DomSanitizer } from '@angular/platform-browser';
import { ReportViewComponent } from '../report-view/report-view.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  constructor(
    private RS: ReportService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}
  dataSource = new MatTableDataSource<Report>();
  displayedColumns: string[] = [
    'name',
    'type',
    'authors',
    'keywords',
    'file',
    'viewMore',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.RS.getReports().subscribe((result) => {
      this.dataSource.data = result;
    });
  }

  getAuthors(row: any): string {
    return row.authors
      .map((author: any) => `${author.name} ${author.lastname}`)
      .join(', ');
  }

  downloadFile(fileUrl: string) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    link.click();
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
