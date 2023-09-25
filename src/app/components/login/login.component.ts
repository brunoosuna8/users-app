import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required], //esta prop inicializa vacia y va a ser requerida
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {}
  login() {
    console.log(this.form);
    const user = this.form.value.user;
    const pw = this.form.value.password;
    this.loading = true;

    interval(1000)
      .pipe(
        delay(1000) // Retrasa la emisión durante 1 segundo
      )
      .subscribe(() => {
        this.loading = false;
      });
    if (user === 'admin123' && pw === '123') {
      this.router.navigate(['dashboard']);

      //redirect
    } else {
      this.snackBar.open('User or Password Invalid', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
}
