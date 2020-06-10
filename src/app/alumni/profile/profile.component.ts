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
  ngOnInit(): void {
    this.userObj = this.ps.userObj;
    // console.log(this.userObj);
  }
}
