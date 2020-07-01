import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  constructor(private ps: ProfileService) {}

  queue: any = null;
  ngOnInit(): void {
    this.queue = this.ps.userObj.notifyQueue.reverse();
    // this.queue.reverse();
  }
}
