import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs"
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  urlPath='http://localhost:3000/'

  public loginFlag = false 

  constructor(private http : HttpClient) { }

  signUp(obj:any):Observable <any>{
    return this.http.post(`${this.urlPath}user/signUp`, obj)
  }
  logIn(obj:any):Observable <any>{
    return this.http.post(`${this.urlPath}user/logIn`, obj)
  }
  
  authMe():Observable <any> {
    return this.http.get(`${this.urlPath}user/me`)
  }
  
  logOut():Observable <any>{
    return this.http.post(`${this.urlPath}user/logOut`, null)
  }
  myPosts():Observable <any>{
    return this.http.get(`${this.urlPath}post/myPosts`)
  }
  
  addPost(obj:any):Observable <any>{
    return this.http.post(`${this.urlPath}post/addPost`,obj)
  }

  deletePost(id:any):Observable <any>{
    return this.http.delete(`${this.urlPath}post/myPosts/deletePost/${id}`)
  }

  editPost(obj:any,id:any):Observable <any>{
    return this.http.patch(`${this.urlPath}post/myPosts/editPost/${id}`,obj)
  }

  editProfile(obj:any): Observable <any>{
    return this.http.patch(`${this.urlPath}user/me/editProfile`,obj)
  }
  profileImage(obj:any) : Observable <any>{
    return this.http.post(`${this.urlPath}user/me/profileImage`, obj)
  }

  changePassword(obj:any): Observable <any>{
    return this.http.patch(`${this.urlPath}user/me/editPassword`,obj)
  }
  
  toogleLike(id:any) : Observable <any> {
    return this.http.post(`${this.urlPath}post/readPost/toggleLike/${id}`, null)
  }
 
  addComment(obj:any,id:any) : Observable <any> {
    return this.http.post(`${this.urlPath}post/readPost/addComment/${id}`, obj)
  }

  deleteComment(id:any) : Observable <any> {
    return this.http.delete(`${this.urlPath}post/readPost/deleteComment/${id}`)
  }

  editComment(obj:any,id:any) : Observable <any> {
    return this.http.patch(`${this.urlPath}post/readPost/editComment/${id}`, obj)
  }

  savePost(id:any) : Observable <any> {
    return this.http.post(`${this.urlPath}user/me/savedPosts/${id}`, null)
  }
  deleteSavedPost(id:any) : Observable <any>{
    return this.http.delete(`${this.urlPath}user/me/deletePost/${id}`)
  }
  logOutAll() : Observable <any>{
    return this.http.post(`${this.urlPath}user/logOUtAll`,null)
  }
  deleteAccount(){
    return this.http.delete(`${this.urlPath}user/me/deleteAccount`)
  }
}
