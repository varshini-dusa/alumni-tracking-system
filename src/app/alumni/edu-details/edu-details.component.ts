import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edu-details',
  templateUrl: './edu-details.component.html',
  styleUrls: ['./edu-details.component.css'],
})
export class EduDetailsComponent implements OnInit {
  constructor(
    private ps: ProfileService,
    private hc: HttpClient,
    private ls: LoginService
  ) {}
  userObj: any = null;
  edu: any = null;
  ngOnInit(): void {
    this.userObj = this.ps.userObj;
    this.userObj.fullName =
      this.userObj.name['first'] + ' ' + this.userObj.name['last'];
    this.edu = this.userObj.education;
  }
  editProfile(ngFormObj: NgForm) {
    let userObj = ngFormObj.value;
    userObj['username'] = this.ls.LoggedInUsername;
    userObj['type'] = 'education';
    // console.log(userObj);

    this.hc.post('/alumni/editprofile', userObj).subscribe((res: object) => {
      if (res['message'] == 'edit profile works') {
        console.log('edit profile works');
        alert('updated education details');
      } else {
        console.log('User not existed');
      }
    });
  }
}
