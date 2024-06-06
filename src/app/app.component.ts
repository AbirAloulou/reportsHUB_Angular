import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/Services/auth.service';
import { NgIf } from '@angular/common';
import { ProfessorService } from 'src/Services/professor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'reportsHub';
  user: any = undefined;
  @Output() userEmitter = new EventEmitter<any>();
  role: string = '';

  constructor(
    private authService: AuthService,
    private AS: AuthService,
    private router: Router,
    private PS: ProfessorService
  ) {}

  ngOnInit(): void {
    // this.authService.getUserClaims().then((u) => {
    //   this.user = u;
    //   if (!!this.user) console.log(this.user.displayName);
    //   console.log(this.user.email);
    // });
    // this.AS.getCurrentUser().subscribe((data) => {
    //   if (!data) {
    //     this.router.navigate(['/login']);
    //   } else {
    //     this.router.navigate(['/dashboard']);
    //     this.role = data.role;
    //   }
    // });
  }

  // updateUser(user: any): void {
  //   this.user = user;
  // }
}
