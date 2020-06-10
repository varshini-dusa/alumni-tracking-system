import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  constructor(
    private router: Router,
    private ls: LoginService,
    private hc: HttpClient
  ) {}
  resObj: any;
  ngOnInit(): void {}
  Object = Object;

  myObj = {
    id: 834,
    first_name: 'GS',
    last_name: 'Shahid',
    phone: '1234567890',
    role: null,
    email: 'test@example.com',
    picture: {
      url: null,
      thumb: {
        url: null,
      },
    },
    address: 'XYZ Colony',
    city_id: 2,
    provider: 'email',
    uid: 'test@example.com',
  };
  doSearch(ngFormObj: NgForm) {
    let searchObj = ngFormObj.value;
    this.hc.post('/alumni/search', searchObj).subscribe((res) => {
      if (res['message'] == 'found') {
        this.resObj = res['result'];
        console.log(this.resObj);
      }
    });
  }
}
