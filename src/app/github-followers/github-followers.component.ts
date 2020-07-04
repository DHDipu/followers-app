import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GithubFollowersService } from '../services/github-followers.service';
import { combineLatest } from 'rxjs';



@Component({
  selector: 'app-github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private service: GithubFollowersService) { }

  followers;

  ngOnInit(): void {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
      // this switchMap use for parametars
      .pipe(switchMap(combine=>{
        let id = combine[0].get('id');
        let page = combine[1].get('page');
        
      return this.service.getAll()
      }))
        .subscribe(followers => this.followers = followers)
  }

}
