import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseURL = environment.apiUrl;
  private http = inject(HttpClient);

  getMembers() {
    return this.http.get<Member[]>(this.baseURL + 'users');
  }

  getMember(username: string) {
    return this.http.get<Member>(this.baseURL + 'users/' + username);
  }
}
