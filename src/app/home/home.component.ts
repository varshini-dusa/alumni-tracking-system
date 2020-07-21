import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private ac: ActivatedRoute,
    private ls: LoginService
  ) {}

  ngOnInit(): void {
    this.ls.isLoggedIn = false;
  }

  goLogin() {
    this.router.navigate(['../login'], { relativeTo: this.ac });
  }
  goRegister() {
    this.router.navigate(['../register'], { relativeTo: this.ac });
  }
}
