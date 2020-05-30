import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn:boolean=false;
  LoggedInUsername:string;
  //inject HttpClient
  constructor(private hc:HttpClient) { }
  //to user login
  login(userObj):Observable<any>
  {
    return this.hc.post('/alumni/login',userObj);
  }
  //to user logout
  logout()
  {
    //remove token from local storage
    localStorage.removeItem("signedJwtToken");
    //set user login status to false
    this.isLoggedIn=false;
  }
}
