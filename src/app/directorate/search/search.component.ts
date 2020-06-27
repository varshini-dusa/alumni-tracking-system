import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(
    private router: Router,
    private ls: LoginService,
    private hc: HttpClient
  ) {}

  ngOnInit(): void {}
  resObj: any;
  doSearch(ngFormObj: NgForm) {
    let searchObj = ngFormObj.value;
    this.hc.post('/director/search', searchObj).subscribe((res) => {
      if (res['message'] == 'found') {
        this.resObj = res['result'];
        console.log(this.resObj);
      }
    });
  }
}
