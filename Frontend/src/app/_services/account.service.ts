import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_interface/user.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model);
  }

  setCurrentUser(user: any) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    let user: any;
    localStorage.removeItem('userData');
    this.currentUserSource.next(user);
  }
}
