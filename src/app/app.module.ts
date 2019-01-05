import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { IndexComponent } from './components/dashboard/index/index.component';
import { PostComponent } from './components/dashboard/post/post.component';
import { PostEditComponent } from './components/dashboard/post-edit/post-edit.component';
import { PostCreateComponent } from './components/dashboard/post-create/post-create.component';
import { HomeComponent } from './components/blog/home/home.component';
import { SingleComponent } from './components/blog/single/single.component';
import { RouteModule } from './modules/route/route.module';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LogoutComponent,
        IndexComponent,
        PostComponent,
        PostEditComponent,
        PostCreateComponent,
        HomeComponent,
        SingleComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        RouteModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
