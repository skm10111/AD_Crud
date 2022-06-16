import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private accountService: AccountService,
    private _snack: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.formInitialization();
  }

  formInitialization() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    this.accountService.login(this.loginForm.value).subscribe(
      () => {
        this._router.navigate(['']);
        this._snack.open('Success Login', 'OK');
      },
      (error) => {
        this._snack.open(error.error, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
