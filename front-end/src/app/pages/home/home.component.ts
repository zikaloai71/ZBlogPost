import { Component, OnInit } from "@angular/core";
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

  }
  getPosts(){
    this.global.getPosts().subscribe(
      (data) => {
        this.postsData = data;
        this.postsData = this.postsData.data;
        this.posts = this.postsData;

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

    this.auth.toggleLike(id).subscribe((res) => {
      this.posts[i].likes = res.data.likes
      if (res.message == "liked") {
        ev.target.style.color = "red";
      } else {
        ev.target.style.color = "black";
      }
    });
  }

  determineLikedPosts(post: any) {
    for (let i = 0; i < post.likes.length; i++) {

      if (this.userName == post.likes[i].luName) {
        post.flag = true;

        break;
      } else {
        post.flag = false;

      }
    }

  }

  trendPosts() {
   let trends = this.posts.sort(function (a: any, b: any) {
      return b.likes.length - a.likes.length
    });
    trends = trends.slice(0, 10)

    return trends
  }
}
