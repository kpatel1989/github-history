import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  authToken: string;
  private eventCallback = new Subject<object>(); // Source
  eventCallback$ = this.eventCallback.asObservable();

  constructor(public http: HttpClient) {

  }

  getToken() {
    return this.authToken;
  }
  getHistory(username, repo, authToken) {
    this.authToken = authToken;
    const gitUrl = `https://api.github.com/repos/${username}/${repo}/commits`;
    this.http.get(gitUrl)
      .subscribe(
        data => this.eventCallback.next(data),
        err => console.log(err)
      );
  }

}
