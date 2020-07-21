import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  //inject register service
  constructor(private rs: RegisterService, private router: Router) {}

  ngOnInit() {}

  submitForm(userObj: NgForm) {
    userObj = userObj.value;
    // console.log(userObj);

    Object.keys(userObj).forEach(
      (k) => !userObj[k] && userObj[k] !== undefined && delete userObj[k]
    );

    let l = Object.keys(userObj).length;
    if (l != 10) {
      alert('All fields are mandatory');
    } else {
      this.rs.doRegister(userObj).subscribe((res) => {
        if (res['message'] == 'Does not exist') {
          alert('Entry does not exist');
          // userObj.reset();
        }
        if (res['message'] == 'Account already exists') {
          alert('Account already exists');
        }
        if (res['message'] == 'successfully created') {
          alert('registered successfully');
          this.router.navigate(['./login']);
        }
      });
    }

    // let userOb = JSON.stringify(userObj.value);
  }
}
