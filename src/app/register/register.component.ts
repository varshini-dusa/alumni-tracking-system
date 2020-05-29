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
    let userOb=userObj.value;
    console.log(userOb);  
  }

}
