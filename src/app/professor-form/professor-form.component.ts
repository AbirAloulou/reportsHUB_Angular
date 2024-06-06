import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Establishment } from 'src/Enums/Establishment';
import { Teacher } from 'src/Models/Teacher';

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.css'],
})
export class ProfessorFormComponent implements OnInit {
  teacher: Teacher = {} as Teacher;
  form!: FormGroup;
  hide = true;
  establishment = Object.values(Establishment);

  constructor(
    private dialogRef: MatDialogRef<ProfessorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Teacher
  ) {
    this.teacher = data;
  }

  ngOnInit(): void {
    this.initEditForm();
  }
  initEditForm() {
    this.form = new FormGroup({
      id: new FormControl(this.teacher.id, Validators.required),
      CIN: new FormControl(this.teacher.CIN, Validators.required),
      name: new FormControl(this.teacher.name, Validators.required),
      lastname: new FormControl(this.teacher.lastname, Validators.required),
      birthdate: new FormControl(this.teacher.birthdate, Validators.required),
      phone: new FormControl(this.teacher.phone, Validators.required),
      email: new FormControl(this.teacher.email, Validators.required),
      password: new FormControl(this.teacher.password, Validators.required),
      establishment: new FormControl(
        this.teacher.establishment,
        Validators.required
      ),
    });
  }

  onEdit() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
