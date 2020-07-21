import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // title = 'alumni-tracking-system';
  link: string = '';
  constructor(public ls: LoginService, public rs: RegisterService) {}
  ngOnInit(): void {
    if (this.ls.isAdmin) {
      this.link = 'directorate/adminpage';
    } else {
      // console.log(this.ls.LoggedInUsername);

      this.link = 'alumni/dashboard/' + this.ls.LoggedInUsername;
    }
  }
}
