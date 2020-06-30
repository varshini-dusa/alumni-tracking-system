import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //inject Router object
  constructor(private router: Router, private ls: LoginService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.ls.logout();
    }, 0);
  }

  doLogin(ngFormObj: NgForm) {
    let userObj = ngFormObj.value;
    // console.log(userObj);

    //admin validation & verification
    if (userObj.role == 'admin') {
      let adminUsername = 'admin';
      let adminPassword = 'admin';
      //check for username
      if (userObj.username != adminUsername) {
        alert("admin's username is invalid");
      }
      //check for password
      else if (userObj.password != adminPassword) {
        alert("admin's password is invalid");
      } else {
        this.ls.isLoggedIn = true;
        this.ls.LoggedInUsername = adminUsername;
        this.ls.isAdmin = true;
        this.router.navigate(['./adminpage']);
      }
    }
    //user validation & verification
    if (userObj.role == 'user') {
      this.ls.login(userObj).subscribe((res) => {
        if (res['message'] == 'invalid username') {
          alert('invalid username..plz try again');
          ngFormObj.reset();
        }
        if (res['message'] == 'invalid password') {
          alert('invalid password..plz try again');
          ngFormObj.reset();
        }
        if (res['message'] == 'success') {
          //store token in local storage
          localStorage.setItem('signedJwtToken', res['token']);

          //update user status in Login Service
          this.ls.LoggedInUsername = res['username'];
          this.ls.isLoggedIn = true;

          //navigate to alumni dashboard component
          this.router.navigate(['./dashboard', res['username']]);
        }
      });
    }
  }
}
