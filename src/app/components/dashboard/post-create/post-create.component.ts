import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    postForm: FormGroup     =   new FormGroup({
        title: new FormControl('', [ Validators.required ]),
        content: new FormControl('', [ Validators.required ]),
    });

    constructor(
        private post: PostService,
        private route: Router
    ) { }
    
    ngOnInit() {
    }

    /**
     * Submit the post
     * @return void
     */
    submitPost() {
        if ( this.postForm.invalid ) {
            for( let field in this.postForm.controls ) {
                this.postForm.controls[ field ].markAsTouched();
            }
            return false;
        }
        
        const { title, content }    =   this.postForm.value;

        this.post.submit( title, content ).then( result => {
            this.route.navigateByUrl( '/dashboard/posts?notice=post-created' );
        })
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
