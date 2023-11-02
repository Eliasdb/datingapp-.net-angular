import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  template: `
    <form #registerForm="ngForm" (ngSubmit)="register()" autocomplete="off">
      <h2 class="text-center text-light">Sign up</h2>
      <hr />
      <div class="form-group mb-3">
        <input
          type="text"
          class="form-control"
          name="username"
          [(ngModel)]="model.username"
          placeholder="Username"
        />
      </div>

      <div class="form-group mb-3">
        <input
          type="password"
          class="form-control"
          name="password"
          [(ngModel)]="model.password"
          placeholder="Password"
        />
      </div>
      <div class="form-group text-center">
        <button class="btn btn-outline-success me-2" type="submit">
          Register
        </button>
        <button class="btn btn-default me-2" (click)="cancel()" type="button">
          Cancel
        </button>
      </div>
    </form>
  `,
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: () => this.cancel(),
      error: (error) => {
        this.toastr.error(error.error);
        console.log(error);
      },
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
