import {Component, OnInit } from "@angular/core"; 
import { AuthService } from "src/app/services/auth.service";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})

export class HomeComponent implements OnInit {
  posts: any = [];
  postsData: any = [];
  trends: any = [];
  loadingComp: boolean = true;
  searchedText: string = "";
  likedPosts: any;
  likedFlag: any;
  userId: any
  userName: any
 
  constructor(private global: GlobalService, private auth: AuthService) {
  }

  ngOnInit(): void {


    let token = localStorage.getItem('token')
    if (token) {
      this.auth.authMe().subscribe((res) => {

        this.likedPosts = res.likedPosts;
        this.userId = res._id
        this.userName = res.name
        this.getPosts();
      });
     
    }
   this.getPosts()
  }
  getPosts(){
    this.global.getPosts().subscribe(
      (data) => {
        this.postsData = data;
        this.postsData = this.postsData.data;
        this.posts = this.postsData;
        this.trends = this.posts;
        
       this.posts.forEach((post: any) => {
          
       this.determineLikedPosts(post)
      
        });
  
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.loadingComp = false;
      }
    );


  }
  searchBlog(args?: string) {
    if (args) {
      this.posts = this.postsData.filter((pos: any) => pos.category == args);
      return this.posts;
    } else if (this.searchedText != "") {
      this.posts = this.postsData.filter((pos: any) =>
        pos.title.includes(this.searchedText)
      );
      return this.posts;
    } else {
      this.posts = this.postsData;
      return this.posts;
    }
  }

  likePost(id: any, i: any, ev: any) {
    let post = this.trends.find((trend:any)=>trend._id == id)
    this.auth.toggleLike(id).subscribe((res) => {
      this.posts[i].likes = res.data.likes
      if (res.message == "liked") {
        ev.target.style.color = "red";
        post.flag = true;
      } else {
        ev.target.style.color = "black";
        post.flag = false;
      }
    });
  }

  determineLikedPosts(post: any) {
    for (let i = 0; i < post.likes?.length; i++) {
      if (this.userId == post.likes[i].liId) {
        post.flag = true;
        break;
      } else {
        post.flag = false;
      }
    }

  }


trendPosts() {
    this.trends = this.mergeSort(this.posts)
    this.trends = this.trends.slice(0, 10)
    return this.trends
  }


// merge arrays function is a helper method which help in sorting two arrays and return it in a one array
mergeArrays(arr1:any,arr2:any){
  let i = 0;
  let j = 0;
  let result = [];
  while(i<arr1.length && j<arr2.length){
     if(arr1[i].likes.length>arr2[j].likes.length){
         result.push(arr1[i]);
         i++;
     } 
      else{
          result.push(arr2[j]);
          j++;
      }
     
  }
 while(i<arr1.length){
          result.push(arr1[i]);
          i++;
  }

  while(j<arr2.length){
          result.push(arr2[j]);
          j++;
  }
  
  return result;
}


mergeSort(arr:any){
  if(arr.length <= 1) return arr;
  let mid = Math.floor(arr.length/2);
  let left:any = this.mergeSort(arr.slice(0,mid));
  let right:any = this.mergeSort(arr.slice(mid));
  return this.mergeArrays(left,right)
}

}

  