import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { validateUser } from 'src/assets/controllers/validateInput';
@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent {
  selectedGender: 'male' | 'female' = 'male';
  allInputs: boolean;
  validateInputs = {
    name: false,
    lastName: false,
    age: false,
  };
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService
  ) {
    if (this.data) {
      this.selectedGender = this.data.Gender;
      this.form = this.fb.group({
        name: [data.Name, Validators.required], //esta prop inicializa vacia y va a ser requerida
        lastName: [data.LastName, Validators.required],
        age: [data.Age, Validators.required],
        gender: [data.Gender],
        Education: [data.Education],
        JoiningYear: [data.JoiningYear],
        City: [data.City],
        PaymentTier: [data.PaymentTier],
        EverBrenched: [data.EverBrenched],
      });
    } else {
      console.log(this.data);
      this.form = this.fb.group({
        id: Math.floor(Math.random() * (1000 - 50000 + 1)) + 50000,
        name: ['', Validators.required], //esta prop inicializa vacia y va a ser requerida
        lastName: ['', Validators.required],
        age: ['', Validators.required],
        gender: [''],
        education: ['', Validators.required],
        joiningYear: ['', Validators.required],
        city: ['', Validators.required],
        paymentTier: ['', Validators.required],
        everBrenched: ['', Validators.required],
      });
    }
    this.onValidate();
  }
  onValidate() {
    this.validateInputs = validateUser(
      this.form.value.name,
      this.form.value.lastName,
      this.form.value.age
    );
    if (
      this.validateInputs.name &&
      this.validateInputs.lastName &&
      this.validateInputs.age
    ) {
      this.allInputs = true;
    } else {
      this.allInputs = false;
    }
  }

  toggleGender(gender: 'male' | 'female') {
    if (gender !== this.selectedGender) {
      this.selectedGender = gender;
    }
  }
  onSubmit() {
    this.form.value.gender = this.selectedGender;
    console.log(this.form.value);
    let id = this.data ? this.data.Id : this.form.value.id;
    let userUpdated: User = {
      Id: id,
      Name: this.form.value.name,
      LastName: this.form.value.lastName,
      Age: this.form.value.age,
      Gender: this.selectedGender,
      Education: this.form.value.education,
      JoiningYear: this.form.value.joiningYear,
      City: this.form.value.city,
      PaymentTier: this.form.value.paymentTier,
      EverBrenched: this.form.value.everBrenched,
    };
    console.log(userUpdated);
    if (this.data) {
      this.userService.updateUser(userUpdated);
    } else {
      this.userService.addUser(userUpdated);
    }
    this.dialogRef.close();
  }
  closeEditDialog() {
    this.dialogRef.close();
  }
}
