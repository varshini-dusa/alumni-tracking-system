import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alumni-tracking-system';
  constructor(public ls:LoginService, public rs:RegisterService){}
}
