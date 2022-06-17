import { Injectable, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  busyRequestCount: number = 0;
  constructor(private _spinner: NgxSpinnerService) {}

  busy() {
    this.busyRequestCount++;
    this._spinner.show();
  }
  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this._spinner.hide();
    }
  }
}
