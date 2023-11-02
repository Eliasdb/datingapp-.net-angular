import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-messages',
  template: ` <p>messages works!</p> `,
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {}
