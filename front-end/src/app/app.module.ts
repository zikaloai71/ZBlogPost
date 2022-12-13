import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ReadPostComponent } from './pages/read-post/read-post.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoadingComponentComponent } from './components/loading-component/loading-component.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReadPostComponent,
    NavbarComponent,
    FooterComponent,
    SignUpComponent,
    LogInComponent,
    ProfileComponent,
    LoadingComponentComponent,
    AddPostComponent,
    EditPostComponent,
    EditProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  //providers is for the things that will render automatically
  providers: [
 {
  provide : HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi:true //with any call of api run this interceptor
 }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
