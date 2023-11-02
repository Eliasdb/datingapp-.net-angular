import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../_modules/shared.module';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, AppRoutingModule, SharedModule],
  selector: 'app-nav',
  template: `
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container">
        <a class="navbar-brand" routerLink="/" routerLinkActive="active"
          >Dating App</a
        >
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <ng-container *ngIf="currentUser$ | async">
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/members"
                routerLinkActive="active"
                >Matches</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/lists" routerLinkActive="active"
                >Lists</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/messages"
                routerLinkActive="active"
                >Messages</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/errors" routerLinkActive="active"
                >Errors</a
              >
            </li>
          </ng-container>
        </ul>
        <div class="dropdown" *ngIf="currentUser$ | async as user" dropdown>
          <a
            class="dropdown-toggle text-light text-decoration-none"
            dropdownToggle
            >Welcome {{ user.username | titlecase }}</a
          >
          <div class="dropdown-menu" *dropdownMenu>
            <a class="dropdown-item">Edit profile</a>
            <a class="dropdown-item" (click)="logout()">Logout</a>
          </div>
        </div>
        <form
          *ngIf="!(currentUser$ | async)"
          #loginForm="ngForm"
          class="d-flex"
          (ngSubmit)="login()"
          autocomplete="off"
        >
          <input
            name="username"
            [(ngModel)]="model.username"
            class="form-control me-2"
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            [(ngModel)]="model.password"
            class="form-control me-2"
            type="password"
            placeholder="Password"
          />
          <button class="btn btn-outline-success" type="submit">Login</button>
        </form>
      </div>
    </nav>
  `,
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  private accountService = inject(AccountService);
  private router = inject(Router);

  protected currentUser$ = this.accountService.currentUser$;

  model: any = {};

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => this.router.navigateByUrl('/members'),
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
