import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseURL = environment.apiUrl;
  members: Member[] = [];

  private http = inject(HttpClient);

  getMembers() {
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseURL + 'users').pipe(
      // projects what we are getting back from API
      map((members) => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username: string) {
    const member = this.members.find((x) => x.userName === username);
    if (member) return of(member);
    return this.http.get<Member>(`${this.baseURL}users/${username}`);
  }

  updateMember(member: Member) {
    return this.http.put(`${this.baseURL}users`, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member };
      })
    );
  }
}
