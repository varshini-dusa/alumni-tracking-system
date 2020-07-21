import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private ps: ProfileService) {}
  userObj: any = null;
  edu: any = null;
  work: any = null;
  ngOnInit(): void {
    this.userObj = this.ps.userObj;
    this.userObj.fullName =
      this.userObj.name['first'] + ' ' + this.userObj.name['last'];
    this.edu = this.userObj.education.reverse();
    this.work = this.userObj.work.reverse();
    // console.log(this.userObj);
  }
}
