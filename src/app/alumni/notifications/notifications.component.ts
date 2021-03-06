import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile.service';
import { LoginService } from 'src/app/login.service';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  constructor(
    private ps: ProfileService,
    private ls: LoginService,
    private pps: PostService
  ) {}

  queue: any = null;
  qPresent: any = true;
  ngOnInit(): void {
    if (this.ps.userObj.notifyQueue != undefined)
      this.queue = this.ps.userObj.notifyQueue.reverse();
    else {
      this.qPresent = false;
    }
    if (this.ps.isNotificationOn) {
      this.pps.emptyNotifications(this.ps.userObj).subscribe((res) => {
        // console.log(res);
        this.ps.isNotificationOn = false;
      });
    }

    // this.queue.reverse();
  }
}
