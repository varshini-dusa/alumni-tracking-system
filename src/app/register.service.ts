import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private hc:HttpClient) { }
  doRegister(userObj):Observable < any >
   {
     return this.hc.post('/user/register',userObj);
   }
}
