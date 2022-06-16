import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/_services/data.service';
import { TableComponent } from '../table.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close({ data: false });
  }
  onOkClick() {
    this._dataService.deleteData(this.data.id);
    this.dialogRef.close({ data: true });
  }
}
