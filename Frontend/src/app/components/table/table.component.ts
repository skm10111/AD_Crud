import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Data, Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Data>();
  resultsLength: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private _dataService: DataService,
    private _router: Router,
    public _dialog: MatDialog,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {}

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'experience',
    'address',
    'dob',
    'created',
    'action',
    'delete',
  ];
  getData() {
    this._dataService.getData().subscribe((response: any) => {
      if (response != null) this.resultsLength = response.length;
      this.dataSource = new MatTableDataSource<Data>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  getEmployeeDetail(id: number) {
    this._router.navigate(['/form', { id: id }]);
  }

  deleteUser(id: number) {
    let dialogRef = this._dialog.open(ConfirmationComponent, {
      width: '380px',
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data) {
        this.getData();
        this._snack.open('Data Deleted ', '', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['mat-toolbar', 'mat-primary'],
        });
      }
    });
  }
}
