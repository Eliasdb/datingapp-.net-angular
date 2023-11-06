import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  standalone: true,
  imports: [CommonModule, TabsModule, GalleryModule],
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
          <tab heading="Photos" #photoTab="tab">
            <gallery
              *ngIf="photoTab.active"
              [items]="images"
              class="gallery"
              thumbPosition="left"
            ></gallery>
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
  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  member: Member | undefined;
  images: GalleryItem[] = [];

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    var username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: (member) => {
        this.member = member;
        this.getImages();
      },
    });
  }

  getImages() {
    if (!this.member) return;
    for (const photo of this.member?.photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }));
    }
  }
}
