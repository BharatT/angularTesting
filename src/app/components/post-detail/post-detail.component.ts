import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/Post/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
post! :Post;
  constructor(private route:ActivatedRoute, private postService:PostService, private location:Location ) { }

  ngOnInit(): void {
    this.getPost()
  }
getPost(){
  let id = this.route.snapshot.paramMap.get('id');
  id && this.postService.getPosts(+id).subscribe((post)=>{
      this.post = post[0];
  })
}

goBack(){
this.location.back();
}

save(){
this.postService.updatePost(this.post).subscribe(()=>this.goBack())
}


}
