import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }
  
  getPosts(){
    return this.http.get("https://zblogpost.onrender.com/post/allPosts")
  }

  getSinglePost(id:any): Observable <any>{
    return this.http.get(`https://zblogpost.onrender.com/post/readPost/${id}`)
  }
}
