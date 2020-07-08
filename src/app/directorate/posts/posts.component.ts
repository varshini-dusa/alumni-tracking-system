import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  items: any;

  constructor(
    private router: Router,
    private hc: HttpClient,
    private ac: ActivatedRoute,
    private ps: PostService
  ) {}

  ngOnInit(): void {
    this.ps.getPosts().subscribe((res: object) => {
      this.items = res['items'];
    });
  }
  submitForm(userObj: NgForm) {
    // console.log(userObj);

    let userOb = userObj.value;
    // console.log(userOb);

    //create obj of type FormData
    let fd = new FormData();

    //append file data to fd object
    fd.append('photo', this.file);
    //append userObj to fd
    fd.append('userObj', JSON.stringify(userOb));

    // console.log(fd);

    this.ps.uploadPost(fd).subscribe((res) => {
      alert(res['message']);
      ($('#exampleModal') as any).modal('hide');
    });

    // this.hc.post('/posts/upload', fd).subscribe((res) => {
    //   alert(res['message']);
    //
    // });
  }
  file: File;
  imgUrl: string | ArrayBuffer = '';
  getImageFile(imageFile: File) {
    // console.log('image data is', imageFile);
    this.file = imageFile;
    //create FileReader obj to read file content
    let reader = new FileReader();

    //read data of file(image)
    reader.readAsDataURL(this.file);

    reader.onload = () => {
      this.imgUrl = reader.result;
      // console.log('image data:', this.imgUrl);
    };
  }
}
