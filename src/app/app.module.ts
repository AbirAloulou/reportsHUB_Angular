import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { NgChartsModule } from 'ng2-charts';
import { FirebaseModule } from './Firebase.module';

// Components import
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { StudentsComponent } from './students/students.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { StudentDeleteComponent } from './student-delete/student-delete.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { SupervisorsComponent } from './supervisors/supervisors.component';
import { ProfessorViewComponent } from './professor-view/professor-view.component';
import { ProfessorFormComponent } from './professor-form/professor-form.component';
import { ProfessorDeleteComponent } from './professor-delete/professor-delete.component';
import { ProfessorAddComponent } from './professor-add/professor-add.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { ReportViewComponent } from './report-view/report-view.component';
import { LoginComponent } from './login/login.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { SupervisorTemplateComponent } from './supervisor-template/supervisor-template.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdminLayoutComponent,
    StudentsComponent,
    StudentViewComponent,
    StudentDeleteComponent,
    StudentFormComponent,
    StudentAddComponent,
    SupervisorsComponent,
    ProfessorViewComponent,
    ProfessorFormComponent,
    ProfessorDeleteComponent,
    ProfessorAddComponent,
    ReportsComponent,
    ReportFormComponent,
    ReportViewComponent,
    LoginComponent,
    AdminInterfaceComponent,
    SupervisorTemplateComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatPaginatorModule,
    MatSortModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    MatChipsModule,
    NgChartsModule,
    FirebaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
