import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Data } from '../_interface/data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addData(model: any) {
    this.http.post(this.baseUrl + 'Employee', model).subscribe();
  }

  getData() {
    return this.http.get<Data>(this.baseUrl + 'Employee');
  }
  getEmpDetail(id: number) {
    return this.http.get<Data>(this.baseUrl + 'Employee/edit/' + id);
  }

  updateData(model: any) {
    this.http.put(this.baseUrl + 'Employee', model).subscribe();
  }
  deleteData(id: number) {
    this.http.delete(this.baseUrl + 'Employee/' + id).subscribe();
  }
}
