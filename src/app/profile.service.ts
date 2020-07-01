import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  userObj: any = null;
  isNotificationOn: boolean;
  constructor() {}
}
