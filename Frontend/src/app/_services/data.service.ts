import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Data } from '../_interface/data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = environment.apiUrl;
  constructor(private _http: HttpClient) {}

  addData(model: any) {
    return this._http.post(this.baseUrl + 'Employee', model);
  }

  getData() {
    return this._http.get<Data>(this.baseUrl + 'Employee');
  }
  getEmpDetail(id: number) {
    return this._http.get<Data>(this.baseUrl + 'Employee/edit/' + id);
  }

  updateData(model: any) {
    return this._http.put(this.baseUrl + 'Employee', model);
  }
  deleteData(id: number) {
    this._http.delete(this.baseUrl + 'Employee/' + id).subscribe();
  }
}
