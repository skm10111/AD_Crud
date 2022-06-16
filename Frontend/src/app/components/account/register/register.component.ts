import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: `./register.component.html`,
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  resisterForm!: FormGroup;
  constructor(
    private accountService: AccountService,
    private _snack: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.formInitialization();
  }

  formInitialization() {
    this.resisterForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }
  register() {
    this.accountService.register(this.resisterForm.value).subscribe(
      () => {
        this.loginUser({
          username: this.resisterForm.controls['username'].value,
          password: this.resisterForm.controls['password'].value,
        });
        this._snack.open('Success Registration', 'OK', {
          duration: 3000,
        });
      },
      (error) => {
        this._snack.open(error.error, 'OK', {
          duration: 2000,
        });
      }
    );
  }

  loginUser(model: any) {
    this.accountService.login(model).subscribe(() => {
      this._router.navigate(['']);
    });
  }
}
