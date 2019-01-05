import { Injectable } from '@angular/core';
import { AsyncResponse } from '../interfaces/async-response';
import { Post } from '../interfaces/post-interface';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    
    constructor() { }

    /**
     * Submit a new post to the fake server
     * @param title string
     * @param content string
     */
    submit( title, content ): Promise<AsyncResponse> {
        return new Promise( ( resolve ) => {
            
            const postIndex     =   localStorage.getItem( 'post_index' ) !== null ?
                parseInt( localStorage.getItem( 'post_index' ) ):   1;

            const rawPosts      =   localStorage.getItem( 'posts' );
            const posts         =   <Post[]>JSON.parse( rawPosts ) === null ? [] : JSON.parse( rawPosts );
            const newIndex      =   postIndex + 1;

            posts.push({ title, content, author: 'Blair Jersyer', id : newIndex });

            localStorage.setItem( 'posts', JSON.stringify( posts ) );
            localStorage.setItem( 'post_index', newIndex.toString() );

            resolve({
                message: 'The post has been submitted',
                status: 'success'
            });
        })
    }

    /**
     * Get All Defined Posts
     * @return array of Post
     */
    getPosts(): Post[] {
        const rawPosts  =   localStorage.getItem( 'posts' );
        return JSON.parse( rawPosts ) !== null ? JSON.parse( rawPosts ) : [];
    }

    /**
     * delete a specific post
     * @param number id
     * @return void
     */
    deletePost( id: number ) {
        const posts     =   this.getPosts();
        const newPosts  =   posts.filter( post => post.id !== id );
        localStorage.setItem( 'posts', JSON.stringify( newPosts ) );
    }

    /**
     * get post using provided id
     * @param int post id
     * @return Post
     */
    getPost( id ): Post | null {
        const posts     =   this.getPosts();
        const singlePost  =   posts.filter( post => post.id === id );
        return singlePost.length > 0 ? singlePost[0]: null;
    }

    /**
     * Edit post
     * @param number post id
     * @param object { title, content }
     */
    editPost( id, { title, content }) {
        const posts     =   this.getPosts();
        
        posts.forEach( post => {
            if ( post.id === id ) {
                post.content    =   content;
                post.title      =   title;
                post.author     =   'Admin';
            }
        });

        localStorage.setItem( 'posts', JSON.stringify( posts ) );
    }
}
