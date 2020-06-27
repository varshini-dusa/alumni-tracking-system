import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.css'],
})
export class WorkDetailsComponent implements OnInit {
  constructor(
    private ps: ProfileService,
    private hc: HttpClient,
    private ls: LoginService
  ) {}
  userObj: any = null;
  work: any = null;
  isWork = false;
  ngOnInit(): void {
    this.userObj = this.ps.userObj;
    this.userObj.fullName =
      this.userObj.name['first'] + ' ' + this.userObj.name['last'];
    if (this.userObj.work != undefined) {
      console.log(this.userObj.work);

      this.isWork = true;
      this.work = this.userObj.work;
    }
  }
  editProfile(ngFormObj: NgForm) {
    let userObj = ngFormObj.value;
    userObj['username'] = this.ls.LoggedInUsername;
    userObj['type'] = 'work';
    // console.log(userObj);

    this.hc.post('/alumni/editprofile', userObj).subscribe((res: object) => {
      if (res['message'] == 'edit profile works') {
        console.log('edit profile works');
      } else {
        console.log('User not existed');
      }
    });
  }
}
