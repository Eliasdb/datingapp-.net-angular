import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  template: `
    <ngx-spinner type="line-scale-party">Loading...</ngx-spinner>
    <app-nav />
    <div class="container" style="margin-top: 100px">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Dating app';
  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
