import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-test-error',
  template: `
    <ng-container>
      <button (click)="get500Error()" class="btn btn-outline-primary me-3">
        Test 500 Error
      </button>
      <button (click)="get400Error()" class="btn btn-outline-primary me-3">
        Test 400 Error
      </button>
      <button (click)="get401Error()" class="btn btn-outline-primary me-3">
        Test 401 Error
      </button>
      <button (click)="get404Error()" class="btn btn-outline-primary me-3">
        Test 404 Error
      </button>
      <button
        (click)="get400ValidationError()"
        class="btn btn-outline-primary me-3"
      >
        Test 400 Validation Error
      </button>

      <div class="row mt-5" *ngIf="validationErrors.length > 0">
        <ul class="text-danger">
          <li *ngFor="let error of validationErrors">
            {{ error }}
          </li>
        </ul>
      </div>
    </ng-container>
  `,
  styleUrls: ['./test-error.component.css'],
})
export class TestErrorComponent implements OnInit {
  baseURL = 'http://localhost:5000/api/';
  validationErrors: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  get404Error() {
    this.http.get(this.baseURL + 'buggy/not-found').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error),
    });
  }

  get400Error() {
    this.http.get(this.baseURL + 'buggy/bad-request').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error),
    });
  }

  get500Error() {
    this.http.get(this.baseURL + 'buggy/server-error').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error),
    });
  }

  get401Error() {
    this.http.get(this.baseURL + 'buggy/auth').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error),
    });
  }

  get400ValidationError() {
    this.http.post(this.baseURL + 'account/register', {}).subscribe({
      next: (response) => console.log(response),
      error: (error) => {
        console.error(error);
        this.validationErrors = error;
      },
    });
  }
}
