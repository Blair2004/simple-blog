import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post-interface';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    posts: Post[]    =  [];
    
    constructor(
        public postService: PostService
    ) { }
    
    ngOnInit() {
        this.posts  =   this.postService.getPosts();
    }
    
}
