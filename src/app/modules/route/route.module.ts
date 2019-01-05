import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/blog/home/home.component';
import { SingleComponent } from 'src/app/components/blog/single/single.component';
import { IndexComponent } from 'src/app/components/dashboard/index/index.component';
import { PostComponent } from 'src/app/components/dashboard/post/post.component';
import { PostEditComponent } from 'src/app/components/dashboard/post-edit/post-edit.component';
import { PostCreateComponent } from 'src/app/components/dashboard/post-create/post-create.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { LogoutComponent } from 'src/app/components/logout/logout.component';
import { RegisterComponent } from 'src/app/components/register/register.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot([
            {
                path: '',
                component: HomeComponent
            }, {
                path: 'blog/:id',
                component: SingleComponent
            }, {
                path : 'dashboard',
                component: IndexComponent,
                children: [{
                    path: 'posts',
                    component: PostComponent
                }, {
                    path: 'posts/edit/:id',
                    component: PostEditComponent,
                }, {
                    path: 'posts/create',
                    component: PostCreateComponent
                }]
            }, {
                path: 'login',
                component: LoginComponent
            }, {
                path: 'logout',
                component: LogoutComponent
            }, {
                path: 'register',
                component: RegisterComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class RouteModule { }
