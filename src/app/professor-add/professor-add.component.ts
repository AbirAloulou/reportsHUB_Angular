import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Establishment } from 'src/Enums/Establishment';

@Component({
  selector: 'app-professor-add',
  templateUrl: './professor-add.component.html',
  styleUrls: ['./professor-add.component.css'],
})
export class ProfessorAddComponent implements OnInit {
  establishment = Object.values(Establishment);
  form!: FormGroup;
  constructor(private dialogRef: MatDialogRef<ProfessorAddComponent>) {}
  ngOnInit(): void {
    this.initAddForm();
  }
  initAddForm() {
    this.form = new FormGroup({
      id: new FormControl(0, Validators.required),
      CIN: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      birthdate: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      establishment: new FormControl(null, Validators.required),
    });
  }
  onAdd() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
