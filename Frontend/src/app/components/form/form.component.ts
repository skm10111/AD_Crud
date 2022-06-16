import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  empForm!: FormGroup;
  queryParameter: any;
  isLoading: boolean = false;
  constructor(
    private _dataService: DataService,
    private _route: ActivatedRoute,
    private _router: Router
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
    this.isLoading = true;
    if (this.queryParameter > 0) {
      this._dataService.updateData(this.empForm.value);
    } else {
      this._dataService.addData(this.empForm.value);
    }
    this.isLoading = false;
    this._router.navigate(['/table']);
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
