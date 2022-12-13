import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { GlobalService } from "src/app/services/global.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-read-post",
  templateUrl: "./read-post.component.html",
  styleUrls: ["./read-post.component.css"],
})
export class ReadPostComponent implements OnInit {
  postId: any;
  post: any;
  posts:any;
  ind:any;
  loadingComp: boolean = true;
  comments: any;
  isSubmit = false;
  userId: any;
  editCommentFlag = false;
  savedPosts:any;
  saveFlag=false;
  likedPosts:any;
  likeFlag=false;
  
  addCommentForm = new FormGroup({
    conComm: new FormControl("", [Validators.required]),
  });

  editCommentForm = new FormGroup({
    conComm: new FormControl("", [Validators.required]),
  });

  constructor(
    private global: GlobalService,
    private activated: ActivatedRoute,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.auth.authMe().subscribe((res) => {
      this.userId = res._id;
      this.savedPosts =res.savedPosts
      this.likedPosts = res.likedPosts
  
      const index = this.savedPosts.findIndex((savePost:any)=>savePost.postId==this.postId)

      
      if(index>=0){
      this.saveFlag= true;
      }
      else{
       this.saveFlag = false;
      }
      const i = this.likedPosts.findIndex((savePost:any)=>savePost.postId==this.postId)
      if(i>=0){
      this.likeFlag= true;
      }
      else{
       this.likeFlag = false;
      }
    });
  }

  get addCommentData() {
    return this.addCommentForm.controls;
  }
  get editCommentData() {
    return this.editCommentForm.controls;
  }

  ngOnInit(): void {
    this.postId = this.activated.snapshot.paramMap.get("id");
    this.global.getPosts().subscribe(res=>{
      this.posts = res
      this.ind= this.posts.data.findIndex((p:any)=>p._id == this.postId)
      if(this.ind>=0){
        this.global.getSinglePost(this.postId).subscribe(
          (post) => {
            this.post = post.data;
            this.comments = post.data.comments;
          },
          (err) => {
            console.log(err);
          },
          () => {
            this.loadingComp = false;
          }
        );
      }
    })
 

  }
  likePost(ev: any) {
    this.auth.toogleLike(this.postId).subscribe((res) => {
      if (res.message == "liked") {
        this.post.likes.length += 1;
        ev.target.style.color = "red";
      } else {
        this.post.likes.length -= 1;
        ev.target.style.color = "black";
      }
    });
  }

  addComment() {
    this.isSubmit = true;

    if (this.addCommentForm.valid) {
      this.auth
        .addComment(this.addCommentForm.value, this.postId)
        .subscribe((res) => {
          if (res.apiStatus) {
            this.toastr.success(`your comment added successfully`);
            this.comments = res.data.comments;
          }
        });
    }
  }
  toggleEditCommentForm() {
    this.editCommentFlag = !this.editCommentFlag;
  }
  handleCommentEdit(id: any) {
    if (this.editCommentForm.valid) {
      this.auth.editComment(this.editCommentForm.value, id).subscribe((res) => {
        if (res.apiStatus) {
          this.toastr.success(`your comment edited successfully`);
          this.comments = res.data.comments;
          this.editCommentFlag = false;
        }
      });
    }
  }
  handleCommentDelete(id: any, i: any) {
    this.auth.deleteComment(id).subscribe((res) => {
      this.toastr.success(`your comment deleted successfully`);
    });
    this.comments.splice(i, 1);
  }

  savePost(id:any){
    this.auth.savePost(id).subscribe(res=>{
       this.toastr.success(`added to saved posts`);
       this.saveFlag=true;
    })
  }

 
}
