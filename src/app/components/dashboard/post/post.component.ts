import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post-interface';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    
    posts: Post[]   =   [];

    constructor(
        public postService: PostService
    ) { 
        this.getPosts();
    }

    /**
     * Retreive all defined posts
     * @return void
     */
    getPosts() {
        this.posts  =   this.postService.getPosts();
    }
    
    ngOnInit() {
    }
    
    /**
     * Proceed delete a post
     * @param number id
     * @return void
     */
    proceedDelete( post:Post ) {
        if ( confirm( 'Would you like to delete this post ?' ) ) {
            this.postService.deletePost( +post.id );
            this.getPosts();
        }
    }
}
