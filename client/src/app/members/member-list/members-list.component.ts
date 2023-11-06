import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MemberService } from 'src/app/_services/member.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, MemberCardComponent],
  selector: 'app-members-list',
  template: `
    <div class="row">
      <div *ngFor="let member of members$ | async" class="col-2">
        <app-member-card [member]="member"></app-member-card>
      </div>
    </div>
  `,
  styleUrls: ['./members-list.component.css'],
})
export class MembersListComponent implements OnInit {
  private memberService = inject(MemberService);
  members$: Observable<Member[]> | undefined;

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
  }
}
