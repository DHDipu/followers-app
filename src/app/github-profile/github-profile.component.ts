import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  constructor(
    private route: Router,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    // how to get id for user for this way to use 'paramMap'
    this.router.paramMap
      .subscribe(param => {
        let id = +param.get('id');
        console.log(id);
      })
  }

  // this is for update any profile
  submit(){
    this.route.navigate(['/followers'],{
    queryParams:{page: 1,order:'newest'}
  });
  }

}
