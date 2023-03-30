import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  urlPath = window.location.href==="http://localhost:4200/" ? 'http://localhost:3000/' : 'https://zblogpost.onrender.com/'

  constructor(private http:HttpClient) { 
   
  }
  
  getPosts(){
    return this.http.get(`${this.urlPath}post/allPosts`)
  }

  getSinglePost(id:any): Observable <any>{
    return this.http.get(`${this.urlPath}post/readPost/${id}`)
  }
}
