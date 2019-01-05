import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/interfaces/post-interface';

@Component({
    selector: 'app-post-edit',
    templateUrl: './post-edit.component.html',
    styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
    postForm: FormGroup     =   new FormGroup({
        title: new FormControl('', [ Validators.required ]),
        content: new FormControl('', [ Validators.required ]),
    });

    post: Post;
    postId: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private postService: PostService
    ) { }
    
    ngOnInit() {
        this.postId     =   +this.route.snapshot.paramMap.get( 'id' );
        const post      =   this.postService.getPost( this.postId );
        if ( post !== null ) {
            this.post   =   <Post>post;
        } else {
            return this.router.navigateByUrl( '/dashboard/posts?error=post-not-found' );
        }

        for( let field in this.postForm.controls ) {
            this.postForm.controls[ field ].setValue( this.post[ field ] );
        }
    }

    /**
     * edit a provided post
     * @return void
     */
    submitPost() {
        if ( this.postForm.invalid ) {
            for( let field in this.postForm.controls ) {
                this.postForm.controls[ field ].markAsTouched();
            }
            return false;
        }

        this.postService.editPost( this.postId, this.postForm.value );
        this.router.navigateByUrl( '/dashboard/posts?notice=post-edited' );
    }
    
    /**
     * computed property 
     * to define if a title is valid
     * @return boolean
     */
    get postTitleInvalid() {
        const field     =   this.postForm.get( 'title' );
        return field.invalid && field.touched;
    }

    /**
     * Computed Property 
     * to define if a content is defined
     * @return boolean
     */
    get postContentInvalid() {
        const field     =   this.postForm.get( 'content' );
        return field.invalid && field.touched;
    }    
}
