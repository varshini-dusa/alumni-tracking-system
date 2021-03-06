import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css'],
})
export class AdminpageComponent implements OnInit {
  constructor(private hc: HttpClient, public ps: ProfileService) {}
  userObj: any = null;
  ngOnInit(): void {
    this.hc.get<object>('/director/admin').subscribe((res: object) => {
      if (res['message'] == 'user existed') {
        this.userObj = res['userObj'];
        this.ps.userObj = this.userObj;
        if (this.ps.userObj.notification > 0) {
          this.ps.isNotificationOn = true;
        }
      } else {
        alert('User not existed');
      }
    });
  }
}
