import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';
import { Teacher } from 'src/Models/Teacher';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userClaims: any;
  public user$: Observable<any>;
  //  public userClaims$ = new Subject<any>();

  listAdmins: any[] = [];
  listSupervisors: Teacher[] = [];
  constructor(public afAuth: AngularFireAuth, public httpClient: HttpClient) {
    this.user$ = this.afAuth.authState;
    console.log(this.user$);
  }
  getUserClaims(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (!!user) {
          this.setUserClaims(user);
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  getUserToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (!!user) {
          user
            .getIdToken()
            .then((token) => resolve(token))
            .catch(() => reject('No token Available.'));
        } else {
          reject('No user logged in');
        }
      });
    });
  }
  setUserClaims(user: any): void {
    this.userClaims = user;
    //    this.userClaims$.next(user);
  }
  doLogin(): Promise<any> {
    // return this.afAuth.signInWithPopup(new auth.signInWithPopup(new auth.OAuthProvider('microsoft.com')));

    // const provider = new auth.OAuthProvider('microsoft.com');
    // return this.afAuth.signInWithPopup(provider);

    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }

  doLogout(): Promise<void> {
    console.log('this is logout');
    return new Promise<void>((resolve, reject) => {
      if (!!this.afAuth.currentUser) {
        this.afAuth.signOut().then(
          () => {
            this.setUserClaims(null);
            resolve();
          },
          (err) => console.log(err)
        );
      } else {
        console.log("log out didn't work");
      }
    });
  }

  // login(email: string, password: string): Observable<any> {
  //   return this.httpClient.get<any[]>('http://localhost:3000/admins').pipe(
  //     map((users) => {
  //       const user = users.find(
  //         (u) => u.email === email && u.password === password
  //       );
  //       if (user) {
  //         console.log(user);
  //         return user;
  //       } else {
  //         console.log("This is not admin, let's try supervisors");
  //         this.httpClient
  //           .get<Teacher[]>('http://localhost:3000/supervisors')
  //           .pipe(
  //             map((teachers) => {
  //               const teacher = teachers.find(
  //                 (t) => t.email === email && t.password === password
  //               );
  //               if (teacher) {
  //                 console.log(teacher);
  //                 return teacher;
  //               }
  //             })
  //           );
  //       }
  //     })
  //   );
  // }

  currentUser: { id: number; role: string } = { id: 0, role: '' };

  getCurrentUser(): Observable<{ id: number; role: string }> {
    console.log('current user' + this.currentUser);
    return of(this.currentUser);
  }

  // login(email: string, password: string): Observable<any[]> {
  //   return this.httpClient.get<any[]>('http://localhost:3000/admins').pipe(
  //     switchMap((users) => {
  //       const user = users.find(
  //         (u: any) => u.email === email && u.password === password
  //       );
  //       if (user) {
  //         console.log(user);
  //         this.currentUser = { id: user.id, role: 'admin' };
  //         return [user, 'admin'];
  //       } else {
  //         console.log("This is not admin, let's try supervisors");
  //         return this.httpClient
  //           .get<Teacher[]>('http://localhost:3000/supervisors')
  //           .pipe(
  //             map((teachers) => {
  //               const teacher = teachers.find(
  //                 (t: Teacher) => t.email === email && t.password === password
  //               );
  //               if (teacher) {
  //                 console.log(teacher);
  //                 this.currentUser = { id: teacher.id, role: 'professor' };
  //                 return [teacher, 'professor'];
  //               } else {
  //                 throw new Error('Invalid email or password');
  //               }
  //             })
  //           );
  //       }
  //     })
  //   );
  // }
  login(email: string, password: string): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/admins').pipe(
      switchMap((users) => {
        const user = users.find(
          (u: any) => u.email === email && u.password === password
        );
        if (user) {
          console.log(user);
          this.currentUser = { id: user.id, role: 'admin' };
          return of([user, 'admin']);
        } else {
          console.log("This is not admin, let's try supervisors");
          return this.httpClient
            .get<Teacher[]>('http://localhost:3000/supervisors')
            .pipe(
              map((teachers) => {
                const teacher = teachers.find(
                  (t: Teacher) => t.email === email && t.password === password
                );
                if (teacher) {
                  console.log(teacher);
                  this.currentUser = { id: teacher.id, role: 'professor' };
                  return [teacher, 'professor'];
                } else {
                  throw new Error('Invalid email or password');
                }
              })
            );
        }
      })
    );
  }
}
