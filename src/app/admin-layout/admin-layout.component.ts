import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';
import { ProfessorService } from 'src/Services/professor.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit {
  user: any = undefined; // bech ye5o valeur mte3ha wala null feyda tet3aba bi haja
  @Output() userEmitter = new EventEmitter<any>();
  role: string = '';

  constructor(
    private AS: AuthService,
    private router: Router,
    private PS: ProfessorService
  ) {}
  signout(): void {
    this.AS.doLogout().then(() => {
      this.userEmitter.emit(null);
      this.user = undefined;
      this.router.navigate(['/login']);
    });
  }

  ngOnInit(): void {
    this.AS.getCurrentUser().subscribe((data) => {
      if (data.role !== '') {
        this.role = data.role;
        if (this.role === 'professor') {
          this.PS.getProfessor(data.id).subscribe((professor) => {
            this.user = professor;
            this.userEmitter.emit(professor);
            console.log('fetched user from layout component' + this.user);
          });
        }
      }
    });

    // this.AS.getUserClaims().then((u) => {
    //   this.user = u;
    //   this.userEmitter.emit(u);
    //   if (!!this.user) console.log(this.user.displayName);
    //   console.log(this.user.email);
    // });
  }
}
