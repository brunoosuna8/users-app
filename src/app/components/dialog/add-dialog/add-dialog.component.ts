import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { group } from '@angular/animations';
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
})
export class AddDialogComponent {
  form: FormGroup;
  selectedGender = 'female';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<AddDialogComponent>
  ) {
    this.form = this.fb.group({
      name: [''],
      lastName: [''],
      age: [''],
      gender: [this.selectedGender],
    });
  }
  toggleGender(gender: 'male' | 'female') {
    if (gender !== this.selectedGender) {
      this.selectedGender = gender;
    }
  }
  onAdd() {
    let { name, lastName, age, gender } = this.form.value;
    let newUser: User = {
      id: Math.floor(Math.random() * (1000 - 50000 + 1)) + 50000,
      name,
      lastName,
      age,
      gender,
    };
    console.log(newUser);
    this.userService.addUser(newUser);
  }
  closeAddDialog() {
    this.dialogRef.close();
  }
}
