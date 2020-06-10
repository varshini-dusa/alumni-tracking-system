import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  username: string = '';
  userObj: any;
  constructor(
    private ls: LoginService,
    private hc: HttpClient,
    private ar: ActivatedRoute,
    private router: Router,
    private ps: ProfileService
  ) {}
  ngOnInit(): void {
    //disabling login
    this.ar.paramMap.subscribe((result) => {
      this.username = result.get('username');
    });
    // this.username = 'sample';
    this.hc.get<object>(`/alumni/${this.username}`).subscribe((res: object) => {
      // this.userObj=res["data"];
      if (res['message'] == 'user existed') {
        this.userObj = res['userObj'];
        this.ps.userObj = this.userObj;
      } else {
        alert('User not existed');
      }
    });
    // console.log('this is dashboard', this.ps.userObj);
  }
}
