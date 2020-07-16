import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private ac: ActivatedRoute) {}

  ngOnInit(): void {}

  goLogin() {
    this.router.navigate(['../login'], { relativeTo: this.ac });
  }
  goRegister() {
    this.router.navigate(['../register'], { relativeTo: this.ac });
  }
}
