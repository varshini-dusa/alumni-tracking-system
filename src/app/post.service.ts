import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postObj: any = null;
  constructor(private hc: HttpClient) {}
  uploadPost(fd): Observable<any> {
    // console.log(fd);
    //
    return this.hc.post('/alumni/upload', fd);
  }
  getPosts() {
    return this.hc.get('/posts/getPosts');
  }
  emptyNotifications(fd) {
    // console.log(fd);

    return this.hc.post('/posts/emptyNot', fd);
  }
}
