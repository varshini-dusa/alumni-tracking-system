import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  constructor(private ps: ProfileService) {}
  mess: any = null;
  ngOnInit(): void {
    this.mess = this.ps.userObj.messages;
  }
}
