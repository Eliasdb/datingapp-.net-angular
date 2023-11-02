import { Component } from '@angular/core';

@Component({
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
