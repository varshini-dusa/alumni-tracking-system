import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(
    private router: Router,
    private ls: LoginService,
    private hc: HttpClient,
    private ac: ActivatedRoute,
    private ps: ProfileService
  ) {}

  searchResults: any = null;
  ngOnInit(): void {}
  resObj: any;
  userObj: any = null;
  doSearch(ngFormObj: NgForm) {
    let searchObj = ngFormObj.value;
    this.hc.post('/director/search', searchObj).subscribe((res) => {
      if (res['message'] == 'found') {
        this.resObj = res['result'];
        // console.log(this.resObj.count());
      }
    });
  }
  sendMessage(nnFormObj: NgForm, un: any) {
    let obj = nnFormObj.value;
    if (un.username == undefined) alert('The alumni account doesnot exist!');
    else {
      obj['username'] = un.username;
      obj['sentBy'] = 'admin';
      this.hc
        .post<object>('/director/sendMessage', obj)
        .subscribe((res: object) => {
          if (res['message'] == 'Message sent') {
            // console.log(res['userObj']);
            this.userObj = res['userObj'];
            this.ps.userObj = this.userObj;
            // console.log(this.ps.userObj);
            alert('Message sent!');
            this.router.navigate(['../messages'], { relativeTo: this.ac });
          } else {
            alert('Error in sending message');
          }
        });
    }
  }
}
