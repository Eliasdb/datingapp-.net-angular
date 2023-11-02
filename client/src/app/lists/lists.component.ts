import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-lists',
  template: ` <p>lists works!</p> `,
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent {}
