import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //inject register service
  constructor(private rs:RegisterService,private router:Router) { }

  ngOnInit() {
  }

  submitForm(userObj:NgForm)
  {
    //console.log(userObj);

    // let userOb = JSON.stringify(userObj.value);
    this.rs.doRegister(userObj.value).subscribe((res)=>{
      if(res["message"]=="already exists")
      {
        alert("already exists");
        userObj.reset();
      }
      if(res["message"]=="successfully created")
      {
        alert("registered successfully");
        this.router.navigate(['./login']);
      }
    });
  }


}
