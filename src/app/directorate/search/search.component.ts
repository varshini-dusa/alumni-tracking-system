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
  ngOnInit(): void {
    var roll = document.getElementById('roll');
    roll.onchange = function () {
      document.getElementById('clgdiv').style.display = 'none';
      document.getElementById('passdiv').style.display = 'none';
      document.getElementById('citydiv').style.display = 'none';
      document.getElementById('comdiv').style.display = 'none';
    };
  }
  resObj: any;
  userObj: any = null;
  nres: any = -1;
  resetbtn() {
    document.getElementById('clgdiv').style.display = '';
    document.getElementById('passdiv').style.display = '';
    document.getElementById('citydiv').style.display = '';
    document.getElementById('comdiv').style.display = '';
  }
  doSearch(ngFormObj: NgForm) {
    let searchObj = ngFormObj.value;
    if (searchObj.college == 'empty') {
      // console.log('college is empty');
      delete searchObj.college;
    }
    if (searchObj.year == 'empty') {
      // console.log('year is empty');
      delete searchObj.year;
    }
    if (searchObj.city == 'empty') {
      // console.log('city is empty');
      delete searchObj.city;
    }
    // console.log(searchObj);

    this.hc.post('/director/search', searchObj).subscribe((res) => {
      if (res['message'] == 'found') {
        this.resObj = res['result'];
        this.nres = this.resObj.size;
        // this.resObj = this.resObj.filter((item) => item.username != 'admin');
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
  sendToAll(formObj: NgForm) {
    var obj = formObj.value;
    obj['sentBy'] = 'admin';
    console.log(obj);
    ($('#exampleModal') as any).modal('hide');
    if (this.resObj == undefined || this.resObj == null) {
      console.log('undefined resObj');
      this.hc
        .post<object>('/director/sendMessage', obj)
        .subscribe((res: object) => {
          console.log(res);
          if (res['message'] == 'Message sent') {
            alert('Message sent!');
            this.router.navigate(['../messages'], { relativeTo: this.ac });
          } else {
            alert('Error in sending message');
          }
        });
    } else {
      obj['resArray'] = this.resObj;
      console.log(this.resObj);
      this.hc
        .post<object>('/director/sendMessage', obj)
        .subscribe((res: object) => {
          console.log(res);
          if (res['message'] == 'Message sent') {
            alert('Message sent!');
            this.router.navigate(['../messages'], { relativeTo: this.ac });
          } else {
            alert('Error in sending message');
          }
        });
    }
  }
}
