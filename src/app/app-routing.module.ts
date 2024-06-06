import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { SupervisorsComponent } from './supervisors/supervisors.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from 'src/Auth.guard';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'students',
        pathMatch: 'full',
        component: StudentsComponent,
        // canActivate: [authGuard],
      },
      {
        path: 'professors',
        pathMatch: 'full',
        component: SupervisorsComponent,
      },
      {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardComponent,
      },
      {
        path: 'reports',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ReportsComponent,
            // canActivate: [authGuard],
          },
          {
            path: 'add',
            pathMatch: 'full',
            component: ReportFormComponent,
            // canActivate: [authGuard],
          },
          {
            path: ':id/edit',
            pathMatch: 'full',
            component: ReportFormComponent,
            // canActivate: [authGuard],
          },
        ],
      },
    ],
  },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
