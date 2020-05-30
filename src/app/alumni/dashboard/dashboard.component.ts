import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username:string="";
  constructor(private ls:LoginService, private hc:HttpClient,private ar:ActivatedRoute,private router:Router) { }
  ngOnInit():void {
    this.ar.paramMap.subscribe((result)=>{
      this.username=result.get("username");
    })
  }

}
