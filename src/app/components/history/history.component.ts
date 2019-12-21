import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  private git = {
    authToken: '',
    userName: '',
    repo: ''
  };
  private commits = [];

  constructor(private gitHubService: GithubService) { }

  ngOnInit() {
  }
  getHistory() {
    this.gitHubService.getHistory(this.git.userName, this.git.repo, this.git.authToken);
    this.gitHubService.eventCallback$.subscribe(data => {
      this.showHistory(data);
    });
  }
  showHistory(data) {
    this.commits = data.map(element => {
      return {
        hash: element.sha,
        link: element.html_url,
        date: new Date(element.commit.committer.date).toDateString(),
        message: element.commit.message,
        committer: element.commit.committer.name
      };
    });
  }
}
