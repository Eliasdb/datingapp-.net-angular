import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-server-error',
  template: `
    <h4>Internal server error</h4>
    <ng-container *ngIf="error">
      <h5 class="text-danger">Error: {{ error.message }}</h5>
      <p class="font-weight-bold">
        Note: If you are seeing this then Angular is probably not to blame.
      </p>
      <p>What to do next?</p>
      <ol>
        <li>Open the chrome dev tools</li>
        <li>Inspect the network tab</li>
        <li>Check the failing request</li>
        <li>Examine the request URL - make sure it is correct</li>
        <li>
          Reproduce the error in Postman - if we see the same response, then the
          issue is not with Angular
        </li>
      </ol>
      <p>
        Following is the stack trace - this is where your investigation should
        start!
      </p>
      <code class="mt-5" style="background-color: whitesmoke">{{
        error.details
      }}</code>
    </ng-container>
  `,
  styleUrls: ['./server-error.component.css'],
})
export class ServerErrorComponent {
  error: any;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.['error'];
  }
}
