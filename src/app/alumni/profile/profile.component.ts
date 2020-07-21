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
  edu: any = [];
  work: any = [];
  hasWork = false;
  ngOnInit(): void {
    this.userObj = this.ps.userObj;
    // console.log(this.userObj);
    this.userObj.fullName =
      this.userObj.name['first'] + ' ' + this.userObj.name['last'];
    this.edu = this.userObj.education;
    this.edu = this.edu.reverse();
    if (this.userObj.work != undefined) {
      this.hasWork = true;
      this.work = this.userObj.work;
      this.work = this.work.reverse();
    }

    // console.log(this.userObj);
  }
}
