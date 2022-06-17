import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private _router: Router, public accountService: AccountService) {}

  ngOnInit(): void {
    this.isUserLogin();
  }

  logout() {
    this.accountService.logout();
    this._router.navigate(['/login']);
  }

  isUserLogin() {
    let getUserData = JSON.parse(String(localStorage.getItem('userData')));
    if (getUserData) this.accountService.setCurrentUser(getUserData);
  }
}
