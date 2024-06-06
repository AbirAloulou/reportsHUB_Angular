// import { Component, NgZone, OnInit } from '@angular/core';
// import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/Services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   // constructor(private AS: AuthService, private router: Router) {}
//   // tryLogin(): void {
//   //   this.AS.doLogin().then(() => {
//   //     this.router.navigate(['/dashboard']);
//   //   });
//   // }

//   form!: FormGroup;
//   isRegisterMode = false;
//   constructor(
//     private authService: AuthService,
//     private ngZone: NgZone,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.form = new FormGroup({
//       email: new FormControl('', [Validators.required, Validators.email]),
//       password: new FormControl('', [Validators.required]),
//     });
//   }

//   tryLogin(): void {
//     this.authService
//       .login(this.form.value.email, this.form.value.password)
//       .subscribe((res) => {
//         console.log(res);
//         const role = res[1];
//         console.log(role);
//         if (role === 'admin') {
//           this.router.navigate(['/dashboard']);
//         }
//         if (role === 'professor') {
//           this.ngZone.run(() => {
//             console.log('successRedirect');
//             this.router.navigate(['/dashboard']);
//           });
//         }
//       });
//   }

//   // tryLogin(): void {
//   //   this.authService.doLogin().then(() => {
//   //     this.successRedirect();
//   //   });
//   // }
//   successRedirect(): void {
//     this.ngZone.run(() => {
//       console.log('successRedirect');
//       this.router.navigate(['/dashboard']);
//     });
//   }
// }

import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isRegisterMode = false;

  constructor(
    private authService: AuthService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  tryLogin(): void {
    this.authService
      .login(this.form.value.email, this.form.value.password)
      .subscribe(
        (res) => {
          console.log(res);
          const role = res[1];
          console.log(role);
          if (role === 'admin') {
            this.router.navigate(['/dashboard']);
          } else if (role === 'professor') {
            this.router.navigate(['/professors']);
          }
        },
        (err) => {
          console.error('Login error: ', err);
        }
      );
  }
}
