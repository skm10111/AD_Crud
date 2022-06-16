import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { DataService } from 'src/app/_services/data.service';
import { ConfirmationComponent } from './confirmation/confirmation.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  constructor(
    private _dataService: DataService,
    private _router: Router,
    public dialog: MatDialog,
    private _snack: MatSnackBar
  ) {}
  dataSource: any = [];
  resultsLength: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getData();
  }

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
      return (this.dataSource = response);
    });
  }

  getEmployeeDetail(id: number) {
    this._router.navigate(['/form', { id: id }]);
  }

  deleteUser(id: number) {
    let dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '380px',
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data) {
        this.getData();
        this._snack.open('Deleted Successfully', 'OK', {
          duration: 2000,
        });
      }
    });
  }
}
