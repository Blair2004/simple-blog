import { Injectable } from '@angular/core';
import { AsyncResponse } from '../interfaces/async-response';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    constructor() { }

    /**
     * fake server authenticate
     * @param string username
     * @param string password
     * @return Promise<AsyncResponse>
     */
    login( username, password ): Promise<AsyncResponse> {
        return new Promise( ( resolve, reject ) => {
            
            localStorage.setItem( 'logged_user', JSON.stringify({
                username, password
            }));

            setTimeout( () => {
                if ( username === 'admin' && password === '123456' ) {
                    resolve({
                        message: 'The user has been successfully logged...',
                        status: 'success'
                    })
                } else {
                    reject({
                        status: 'failed',
                        message: 'Wrong username or password provided.'
                    })
                }
            }, 3000 );
        })
    }
}
