import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { SharedModule } from 'src/app/_modules/shared.module';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  standalone: true,
  imports: [CommonModule, SharedModule],
  selector: 'app-members-detail',
  template: `
    <div class="row" *ngIf="member">
      <div class="col-4">
        <div class="card">
          <img
            src="{{ member.photoUrl || './assets/user.png' }}"
            alt="{{ member.knownAs }}"
            class="card-img-top img-thumbnail"
          />
          <div class="card-body">
            <div>
              <strong>Location:</strong>
              <p>{{ member.city }}, {{ member.country }}</p>
            </div>
            <div>
              <strong>Age:</strong>
              <p>{{ member.age }}</p>
            </div>
            <div>
              <strong>Last Active:</strong>
              <p>{{ member.lastActive }}</p>
            </div>
            <div>
              <strong>Member since:</strong>
              <p>{{ member.created }}</p>
            </div>
          </div>
          <div class="card-footer">
            <div class="btn-group d-flex">
              <button class="btn btn-primary">Like</button>
              <button class="btn btn-success">Message</button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-8">
        <tabset class="member-tabset">
          <tab heading="About {{ member.knownAs }}">
            <h4>Description</h4>
            <p>{{ member.introduction }}</p>
            <h4>Looking for</h4>
            <p>{{ member.lookingFor }}</p>
          </tab>
          <tab heading="Interests">
            <h4>Interests</h4>
            <p>{{ member.interests }}</p>
          </tab>
          <tab heading="Photos">
            <!-- <ngx-gallery
          [options]="galleryOptions"
          [images]="galleryImages"
          style="display: inline-block; margin-bottom: 20px"
        ></ngx-gallery> -->
          </tab>
          <tab heading="Messages">
            <p>Messages will go here</p>
          </tab>
        </tabset>
      </div>
    </div>
  `,
  styleUrls: ['./member-detail.component.css'],
})
export class MembersDetailComponent implements OnInit {
  member: Member | undefined;

  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    var username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: (member) => (this.member = member),
    });
  }
}
