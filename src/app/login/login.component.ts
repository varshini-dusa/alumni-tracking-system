import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //inject Router object
  constructor(private router:Router,private ls:LoginService){}

  ngOnInit() :void{

    setTimeout(() => {
    this.ls.logout();
    }, 0);
    
  }

  doLogin(ngFormObj:NgForm){
    let userObj=ngFormObj.value;
    console.log(userObj);
    if(userObj.role=="user"&&userObj.username=="gudia"&&userObj.password=="gudia")
    {
      console.log("OKAY");
    }
  }
}

