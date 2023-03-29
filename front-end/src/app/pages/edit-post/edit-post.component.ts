import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  postId:any;
  postOldData:any;

  editPostForm = new FormGroup({
    title: new FormControl("" , [Validators.required ,Validators.minLength(5), Validators.maxLength(15)]  ), 

    snippet: new FormControl("" , [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),

    category: new FormControl("" , [Validators.required]),
    // content 20 till finish the app
    content: new FormControl("" , [Validators.required , Validators.minLength(20)])
  })

  isSubmit = false
  constructor(private auth : AuthService , private router : Router , private toastr : ToastrService , private activated: ActivatedRoute , private global : GlobalService) {
    this.postId=this.activated.snapshot.paramMap.get('id')
    this.global.getSinglePost(this.postId).subscribe(res=>{
      
      this.postOldData=res.data
      
    })
    
   }
   
  get postData(){return this.editPostForm.controls}
  

  ngOnInit(): void {
  }

 editPost(){

 this.isSubmit = true

 if(this.editPostForm.valid){
  this.auth.editPost(this.editPostForm.value,this.postId).subscribe(res=>{
    if(res.apiStatus){
      this.toastr.success(`post edited successfully`)
      this.router.navigateByUrl("")
    }
   
  })
 }
 
 }

}
