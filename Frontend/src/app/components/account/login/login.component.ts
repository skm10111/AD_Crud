import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { LoadingService } from 'src/app/_services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isPasswordVisible: boolean = false;
  constructor(
    private _accountService: AccountService,
    private _snack: MatSnackBar,
    private _router: Router,
    public _spinner: LoadingService
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
    this._accountService.login(this.loginForm.value).subscribe(
      () => {
        this._router.navigate(['']);
        this._snack.open('Success Login', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-primary'],
        });
      },
      (error) => {
        this._snack.open(error.error, '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-warn'],
        });
      }
    );
  }
  onChangeVisible() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
