import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  standalone: true,
  imports: [CommonModule, TabsModule, FormsModule],
  selector: 'app-member-edit',
  template: `
    <div class="row" *ngIf="member">
      <div class="col-4">
        <h1>Your profile</h1>
      </div>
      <div class="col-8">
        <div class="alert alert-info" *ngIf="editForm.dirty">
          <strong>Information: </strong> You have made changes. Any unsaved
          changes will be lost
        </div>
      </div>
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
            <button
              [disabled]="!editForm.dirty"
              form="editForm"
              type="submit"
              class="btn btn-success col-12"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div class="col-8">
        <tabset class="member-tabset">
          <tab heading="About {{ member.knownAs }}">
            <form #editForm="ngForm" id="editForm" (ngSubmit)="updateMember()">
              <h4 class="mt-2">Description</h4>
              <textarea
                class="form-control"
                [(ngModel)]="member.introduction"
                name="introduction"
                rows="6"
              ></textarea>
              <h4 class="mt-2">Looking for</h4>
              <textarea
                class="form-control"
                [(ngModel)]="member.lookingFor"
                name="lookingFor"
                rows="6"
              ></textarea>
              <h4 class="mt-2">Interests</h4>
              <textarea
                class="form-control"
                [(ngModel)]="member.interests"
                name="interests"
                rows="6"
              ></textarea>
              <h4 class="mt-2">Location Details:</h4>
              <div class="form-inline">
                <label for="city">City: </label>
                <input
                  [(ngModel)]="member.city"
                  type="text"
                  name="city"
                  class="form-control mx-2"
                />
                <label for="city">Country: </label>
                <input
                  [(ngModel)]="member.country"
                  type="text"
                  name="country"
                  class="form-control mx-2"
                />
              </div>
            </form>
          </tab>
          <tab heading="Edit Photos">
            <p>Photo edit will go here</p>
          </tab>
        </tabset>
      </div>
    </div>
  `,
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member | undefined;
  user: User | null = null;
  private accountService = inject(AccountService);
  private memberService = inject(MemberService);
  private toastr = inject(ToastrService);

  constructor() {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => (this.user = user),
    });
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: (member) => (this.member = member),
    });
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: (_) => {
        this.toastr.success('Profile updated successfully!');
        this.editForm?.reset(this.member);
      },
    });
  }
}
