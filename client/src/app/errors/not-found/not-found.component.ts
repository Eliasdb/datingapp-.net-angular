import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-not-found',
  template: `
    <div class="container">
      <h1>Not found</h1>
      <button class="btn btn-info btn-lg" routerLink="/">
        Return to home page
      </button>
    </div>
  `,
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {}
