import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  standalone: true,
  imports: [CommonModule, MemberCardComponent],
  selector: 'app-members-list',
  template: `
    <div class="row">
      <div *ngFor="let member of members" class="col-2">
        <app-member-card [member]="member"></app-member-card>
      </div>
    </div>
  `,
  styleUrls: ['./members-list.component.css'],
})
export class MembersListComponent implements OnInit {
  private memberService = inject(MembersService);
  members: Member[] = [];

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers().subscribe({
      next: (members) => (this.members = members),
    });
  }
}
