import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  selector: 'app-home',
  template: `
    <div class="container mt-5">
      <div *ngIf="!registerMode" style="text-align: center">
        <h1>Find your match</h1>
        <p class="lead">
          Come on in to view your matches... all you need to do is sign up!
        </p>
        <div class="text-center">
          <button
            (click)="registerToggle()"
            class="btn btn-primary btn-lg me-2"
          >
            Register
          </button>
          <button class="btn btn-info btn-lg">Learn more</button>
        </div>
      </div>

      <div *ngIf="registerMode" class="container">
        <div class="row justify-content-center">
          <div class="col-4">
            <app-register
              (cancelRegister)="cancelRegisterMode($event)"
            ></app-register>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  registerMode = false;

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
