import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  empForm!: FormGroup;
  queryParameter!: number;
  constructor(
    private _dataService: DataService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fromInitialization();
    this.queryParameter = this._route.snapshot.params['id'];

    if (this.queryParameter) {
      this.editData(this.queryParameter);
    }
  }

  fromInitialization() {
    this.empForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      experience: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
    });
  }
  submit() {
    this.empForm.value.experience = String(this.empForm.value.experience);
    if (this.queryParameter > 0) {
      this.updateData();
    } else {
      this.saveData();
    }
  }
  updateData() {
    this._dataService.updateData(this.empForm.value).subscribe(
      () => {
        this._snack.open('Data Update', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-primary'],
        });
        this._router.navigate(['/table']);
      },
      (error) => {
        this._snack.open(error.error, '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-warn'],
        });
      }
    );
  }
  saveData() {
    this._dataService.addData(this.empForm.value).subscribe(
      () => {
        this._snack.open('Data Added', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-primary'],
        });
        this._router.navigate(['/table']);
      },
      (error) => {
        this._snack.open(error.error, '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-warn'],
        });
      }
    );
  }
  editData(int: number) {
    this._dataService.getEmpDetail(int).subscribe((response: Data) => {
      this.empForm.patchValue({
        id: response['id'],
        firstName: response['firstName'],
        lastName: response['lastName'],
        experience: response['experience'],
        address: response['address'],
        dob: response['dob'],
      });
    });
  }
}
