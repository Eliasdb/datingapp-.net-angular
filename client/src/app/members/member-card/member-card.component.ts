import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-member-card',
  template: `
    <div class="card mb-4" *ngIf="member">
      <div class="card-img-wrapper">
        <img
          src="{{ member.photoUrl || './assets/user.png' }}"
          alt="{{ member.knownAs }}"
          class="card-img-top"
        />
        <ul class="list-inline member-icons animate text-center">
          <li class="list-inline-item">
            <button class="btn btn-primary">
              <i class="fa fa-user"></i>
            </button>
          </li>
          <li class="list-inline-item">
            <button class="btn btn-primary">
              <i class="fa fa-heart"></i>
            </button>
          </li>
          <li class="list-inline-item">
            <button class="btn btn-primary">
              <i class="fa fa-envelope"></i>
            </button>
          </li>
        </ul>
      </div>
      <div class="card-body p-1">
        <h6 class="card-title text-center mb-1">
          <i class="fa fa-user me-2"></i>
          {{ member.knownAs }}
        </h6>
        <p class="card-text text-muted text-center">{{ member.city }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent {
  @Input() member: Member | undefined;
}
