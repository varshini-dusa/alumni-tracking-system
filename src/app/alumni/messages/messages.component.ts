import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  constructor(private ps: ProfileService, private hc: HttpClient) {}
  userObj: any = null;
  mess: any = null;
  username: string = this.ps.userObj.username;
  ngOnInit(): void {
    this.hc.get<object>(`/alumni/${this.username}`).subscribe((res: object) => {
      // this.userObj=res["data"];
      if (res['message'] == 'user existed') {
        this.userObj = res['userObj'];
        this.ps.userObj = this.userObj;
      } else {
        alert('User not existed');
      }
    });
    this.userObj = this.ps.userObj;
    this.mess = this.userObj.messages;
  }
}
