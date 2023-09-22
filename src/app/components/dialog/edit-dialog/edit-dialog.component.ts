import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent {
  selectedGender = this.data.gender;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      name: [data.name, Validators.required], //esta prop inicializa vacia y va a ser requerida
      lastName: [data.lastName, Validators.required],
      age: [data.age, Validators.required],
      gender: [data.gender],
    });
    console.log(data);
  }
  toggleGender(gender: 'male' | 'female') {
    if (gender !== this.selectedGender) {
      this.selectedGender = gender;
    }
  }
  onSubmit() {
    this.form.value.gender = this.selectedGender;
    console.log(this.form.value);
    let userUpdated: User = {
      id: this.data.id,
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      age: this.form.value.age,
      gender: this.selectedGender,
    };
    console.log(userUpdated);
    this.userService.updateUser(userUpdated).subscribe((res) => {
      this.dialogRef.close();
    });
  }
  closeEditDialog() {
    this.dialogRef.close();
  }
}
