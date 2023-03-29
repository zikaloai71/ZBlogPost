import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReadPostComponent } from './pages/read-post/read-post.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {path:"",children:[
    {path:"",component:HomeComponent},
    {path:"readPost/:id",component:ReadPostComponent},
    {path:"addPost",component:AddPostComponent},
    {path:"editPost/:id",component:EditPostComponent}
  ]},
  {path:"user" , children:[
    {path:"login",component:LogInComponent},
    {path:"signup", component:SignUpComponent},
    {path:"profile/:id",component:ProfileComponent},
    {path:"editProfile/:id",component:EditProfileComponent},
    {path:"changePassword/:id" , component: ChangePasswordComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
